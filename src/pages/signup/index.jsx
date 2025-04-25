import React, { useState } from 'react'
import lib from "../../lib/Signupdata"
import { FiEye } from "react-icons/fi";
import { FaEyeSlash } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router";

const Signup = () => {
    const data = lib.signupdata();
    const db = getDatabase();
    const navigate = useNavigate();
    const { SuccessToast, InfoToast, ErrorToast } = lib;
    // console.log(data);
    //value store state

    const auth = getAuth();
    const [email, setemail] = useState("")
    const [fullname, setfullname] = useState("")
    const [password, setpassword] = useState("")
    //error handeling state
    const [emailerror, setemailerror] = useState("")
    const [fullnameerror, setfullnameerror] = useState("")
    const [passworderror, setpassworderror] = useState("")
    // Eye handler for password
    const [eye, seteye] = useState("true")

    /**  
     * todo: handlesignup function implement
    motiv:
    @params
    return null
    */
    const handlesignup = () => {
        if (!fullname) {
            setfullnameerror("!Fullname missing");
        }
        else if (!email) {
            setemailerror("!Email missing");
        }
        else if (!password) {
            setpassworderror("!Password missing");
        }
        else {

            createUserWithEmailAndPassword(auth, email, password).then((userinfo) => {
                // console.log(userinfo);
                // alert("Registration Sucessfull")

                SuccessToast("Registration Sucessfull")

                updateProfile(auth.currentUser, {
                    displayName: fullname,
                    photoURL: "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"})
                // console.log(auth.currentUser);

            })
                .then(() => {
                    const userdb = ref(db, 'users/');
                    set(push(userdb), {
                        userid: auth.currentUser.uid,
                        username: auth.currentUser.displayName || fullname,
                        email: auth.currentUser.email || email,
                        password: password,
                        profile_picture: auth.currentUser.photoURL || "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
                    });
                    // alert("send email for verification");
                    InfoToast("send email for verification")
                    navigate("/signin")
                    return sendEmailVerification(auth.currentUser);
                })
                .then((maildata) => {
                    // console.log("mail sucessful", maildata);
                    console.log(maildata);

                })
                .catch((error) => {
                    console.log(error);
                    ErrorToast(error.code)

                })
            // console.log(auth.currentUser);
        }
    }

    // console.log(fullname, email, password);

    /**
     * handleinput : function implement
     * @param ({event})
     * return null
     */

    const handleinput = (e) => {
        const { name, value } = e.target;
        if (name == "fullname") {
            setfullname(value)
        }
        else if (name == "email") {
            setemail(value)
        }
        else {
            setpassword(value)
        }
        //  console.log(`Name is ${name} and value is ${value}`);
    }

    const handelEye = () => {
        seteye(!eye)
    }
    return (
        <div>
            <div className=' flex bg-mainBgcolor items-center'>
                <div className='w-1/2 h-screen flex justify-center items-center '>
                    <div className=''>
                        <h1 className='text-[20px] text- font-bold select-none'>Get start with eaisy <span className='text-blue-700 cursor-none'>register</span></h1>
                        <p className=' font-semibold'>Free register & you can enjoy it</p>
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            {data?.map(({ name, id, required }) => (

                                <div className={name == "password" ? 'flex flex-col gap-y-1 mt-7 relative overflow-hidden' : 'flex flex-col gap-y-1 mt-7'} key={id}>
                                    <label htmlFor="email">
                                        {`Enter ${name}`}
                                        {required && <span className=' text-red-600'> *</span>}
                                    </label>
                                    <input className='p-1 outline-0 border-gray-400 border-1 rounded pr-7 '
                                        type={
                                            name == "email" ? "email"
                                                : name == "fullname" ? "text"
                                                    : (eye ? "password" : "text")


                                        } placeholder={name}
                                        name={name}
                                        onChange={handleinput} />
                                    {name == "password" && <span
                                        onClick={handelEye}
                                        className={passworderror && password == "" ? ('left-[90%] top-[43%] absolute ') : ('left-[90%] top-[59%] absolute cursor-pointer')} >{eye ? <FiEye /> : <FaEyeSlash />}</span>}

                                    {name == "email" && email == "" ? (<span className=' text-red-500'>{emailerror}</span>) :
                                        name == "fullname" && fullname == "" ? (<span className=' text-red-500'>{fullnameerror}</span>) :
                                            name == "password" && password == "" ? (<span className=' text-red-500'>{passworderror}</span>) : ('')
                                    }


                                </div>
                            ))}
                            <button className=' w-full py-2 text-[16px] bg-mainColor text-white font-semibold rounded-full cursor-pointer mt-10' onClick={handlesignup}>SignUp</button>
                        </form>
                        <p className='my-5'>AI ready have an account? <a href="/signin" className='text-blue-600  cursor-pointer'>Sign In</a></p>
                    </div>
                </div>
                <div className='w-1/2 h-screen bg-red-500 '>
                    <picture>
                        <img className='object-cover h-full w-full ' src="https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" srcset="" />
                    </picture>
                </div>
            </div>

        </div>
    )
}

export default Signup
