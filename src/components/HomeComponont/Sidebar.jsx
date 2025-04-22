import React, { useEffect, useState } from 'react'
import avatar from '../../images/avatar.png'
import { AiOutlineSetting } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoHomeOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { TiUpload } from 'react-icons/ti'
import { Link, useLocation, } from 'react-router'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


const Sidebar = () => {
    const db = getDatabase();
    const auth = getAuth();
    const location = useLocation();
    const [userData, setuserData] = useState({});
    const navigationIcon = [
        {
            id: 1,
            path: "/",
            icon: <IoHomeOutline />
        },
        {
            id: 2,
            path: "/message",
            icon: <LuMessageCircleMore />
        },
        {
            id: 3,
            path: "/notification",
            icon: <IoMdNotificationsOutline />
        },
        {
            id: 4,
            path: "/setting",
            icon: <AiOutlineSetting />
        },
        {
            id: 5,
            path: "/signin",
            icon: <RiLogoutBoxRLine />
        },
    ]
    // url params Catch
    // console.log(location);
    // Cloudinary attach
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/latest/global/all.js"
        script.async = true;
        document.body.appendChild(script)
        // console.log(script);

    }, [])

    /**Upload profile picture
     * todo:
     * handle profile function implement,
     */
    const handleProPictureupdate = () => {
        if (window.cloudinary) {
            cloudinary.openUploadWidget({
                cloudName: "ddidljqip", uploadPreset: "ChatApp",
                sources: ['local', 'url', 'istock', 'google_drive']
            }, (error, result) => {
                if (error) {
                    throw new Error("cloudinary profile picture upload error")
                };
                if (result.info.secure_url) {
                    console.log(result.info.secure_url);

                }



            });
        }
        else {
            throw new Error("Profile picture Upload fail")
        }

    }

    /**
     * Fetch the data from firebase realtime database
     */
    useEffect(() => {
        const ferchData = () => {
            const userRef = ref(db, 'users/');
            let obj = [];
            onValue(userRef, (snapshot) => {
                // console.log(snapshot);
                snapshot.forEach((item) => {
                    if (auth.currentUser.uid === item.val().userid) {
                        obj = { ...item.val(), userKey: item.key };
                    }
                    // console.log(item.val().userid);
                })
                setuserData(obj);

            });

        }
        ferchData()
    }, [])

    // console.log(auth.currentUser.uid);
    console.log(userData);

    return (
        <div className=' h-full  bg-green-400 rounded-2xl overflow-hidden'>
            <div className='flex flex-col items-center justify-center'>
                <div className='h-[70px] w-[70px] mt-4 rounded-full relative cursor-pointer group'>
                    <picture>
                        <img className='w-full h-full rounded-full object-cover' src={userData?.profile_picture || avatar } alt="pro pic"/>
                    </picture>
                    <div onClick={handleProPictureupdate} className='absolute hidden group-hover:block left-[30%] top-1/2 text-3xl text-white'>
                        <TiUpload />
                    </div>
                </div>
                <div className='flex flex-col text-center'>{userData?.username || "name"}</div>
            </div>
            {/* navigation icon */}
            <div className='flex flex-col gap-y-3 items-center justify-center mt-8'>
                {navigationIcon?.map(({ icon, id, path }, index) => (
                    <Link to={path} className={location.pathname == path ? 'active text-5xl text-white cursor-pointer' : navigationIcon.length - 1 == index ? " text-5xl text-white cursor-pointer mt-20" : "text-5xl text-white cursor-pointer"} key={id}>
                        {icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar