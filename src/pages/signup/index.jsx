import React, { useState } from 'react'
import lib from "../../lib/Signupdata"
import { FiEye } from "react-icons/fi";
import { FaEyeSlash } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";



const Signup = () => {
    const data = lib.signupdata();
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
                // alert("Signup succesfully")
                toast.success('🦄 Wow so easy!', {
                    position: "top-left",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                updateProfile(auth.currentUser, {
                    displayName: fullname,
                    photoURL: "https://images.pexels.com/photos/15910063/pexels-photo-15910063/free-photo-of-landscape-with-the-matterhorn.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                })
                // console.log(auth.currentUser);
            })
                .then(() => {
                    console.log("send email for verification");
                    return sendEmailVerification(auth.currentUser);
                })
                .then((maildata) => {
                    console.log("mail sucessful", maildata);


                })
                .catch((error) => {
                    console.log(error);

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
                        <p className='font-medium font-semibold'>Free register & you can enjoy it</p>
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            {data?.map(({ name, id, required }) => (

                                <div className={name == "password" ? 'flex flex-col gap-y-1 mt-7 relative overflow-hidden' : 'flex flex-col gap-y-1 mt-7'} key={id}>
                                    <label htmlFor="email">
                                        {`Enter ${name}`}
                                        {required && <span className=' text-red-600'> *</span>}
                                    </label>
                                    <input className='p-1 outline-0 border-gray-400 border-1 rounded pr-7 '
                                        type={name == "email" ? "email" : name == "fullname" ? "text" : (eye? "password":"text")
                                        } placeholder={name}
                                        name={name}
                                        onChange={handleinput} />
                                    {name == "password" && <span
                                        onClick={handelEye}
                                        className={passworderror && password ==""? ('left-[90%] top-[43%] absolute '):('left-[90%] top-[59%] absolute cursor-pointer')} >{eye? <FiEye />:<FaEyeSlash />}</span>}
                                        
                                    {name == "email" && email == "" ? (<span className=' text-red-500'>{emailerror}</span>) :
                                        name == "fullname" && fullname == "" ? (<span className=' text-red-500'>{fullnameerror}</span>) :
                                            name == "password" && password == "" ? (<span className=' text-red-500'>{passworderror}</span>) : ('')
                                    }


                                </div>
                            ))}
                            <button className=' w-full py-2 text-[16px] bg-mainColor text-white font-semibold rounded-full cursor-pointer mt-10' onClick={handlesignup}>SignUp</button>
                        </form>
                        <p className='my-5'>AI ready have an account? <span className='text-blue-600  cursor-pointer'>Sign In</span></p>
                    </div>
                </div>
                <div className='w-1/2 h-screen bg-red-500 '>
                <picture>
                    <img className='object-cover h-full w-full '  src="https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" srcset="" />
                </picture>
                </div>
            </div>

        </div>
    )
}

export default Signup
