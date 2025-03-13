import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import image from "../../images/loginimg.jpg"
import lib from "../../lib/Signupdata"
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const SignIn = () => {
  const { SuccessToast, InfoToast, ErrorToast } = lib;

  const auth = getAuth();
  const database = getDatabase();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: ""
  })
  console.log(loginInfo);
  // Onchange listener
  const loginChange = (e) => {
    const { name, value } = e.target
    // console.log(name,value);
    setloginInfo({
      ...loginInfo,
      [name]: value,
    })
  }
  /**
   * Todo: handle Login function implement
   * @param: ({})
   * return null/void
   */
  const handleLogin = () => {
    if (loginInfo.email == "" && loginInfo.password == "") {
      SuccessToast("Please fill the information")
    }
    else {
      const { email, password } = loginInfo;
      createUserWithEmailAndPassword(auth, email, password).then((info) => {
        //store information in Database.
        set(ref(database, "users/"), {
          email: email,
          password: password,
          profile_picture: "imageUrl"
        });
        SuccessToast("Login succesfull")
      }).catch((err) => {
        ErrorToast(err.code);

      })
    }

  }
  // handle google function implement
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((userinfo) => {
      set(ref(database, 'users/'), {
        username: "Sabbir",
        email: "hghg@gmail.com",
        profile_picture: "imageUrl"
      });

    }).catch(() => {
      console.error("from google login")
    })
  }

  return (
    <div>
      <div className='flex'>
        <div className='w-1/2 flex justify-center items-center'>
          <div Name=' '>
            <div>
              <h1 className='text-2xl font-bold'>Login to your account!</h1>
              <div className='flex items-center gap-x-1.5 px-6 py-3 my-6 border-[1px] border-gray-400 cursor-pointer rounded' onClick={handleGoogle}>
                <FaGoogle />
                <p> Login with Google</p>
              </div>
            </div>
            <div>
              <form action="#" className='flex flex-col gap-y-6' onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col'>
                  <label htmlFor="email" >Email</label>
                  <input className='py-2 px-4 border-b-[1px] border-b-green-500 focus:outline-0 ' onChange={loginChange} type="text" name='email' placeholder='example@gmail.com' />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="email" >Password</label>
                  <input className='py-2 px-4 border-b-[1px] border-b-green-500 focus:outline-0 ' onChange={loginChange} type="password" name='password' placeholder='******' />
                </div>
                <button className='w-full bg-blue-600 py-2 rounded cursor-pointer text-white' type='button' onClick={handleLogin}>Login to Continue</button>
              </form>
              <p className='my-5'>I have no account?<a href="/signup" className='text-blue-600  cursor-pointer'> Create account</a></p>
            </div>
          </div>

        </div>
        <div className='w-1/2 bg-amber-400 h-screen'>
          <picture >
            <img className='object-cover h-full w-full ' src={image} alt="../../images/loginimg.jpg" /></picture></div>
      </div>
    </div>
  )
}

export default SignIn