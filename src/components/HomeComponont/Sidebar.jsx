import React from 'react'
import proPic from '../../images/Pro.jpg'
import { AiOutlineSetting } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoHomeOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { TiUpload } from 'react-icons/ti'
import { Link } from 'react-router'

const Sidebar = () => {
    const navigationIcon = [
        {
            id: 1,
            path:"/home",
            icon: <IoHomeOutline />
        },
        {
            id: 1,
            path:"/message",
            icon: <LuMessageCircleMore />
        },
        {
            id: 1,
            path:"/notification",
            icon: <IoMdNotificationsOutline />
        },
        {
            id: 1,
            path:"/setting",
            icon: <AiOutlineSetting />
        },
        {
            id: 1,
            path:"/signin",
            icon: <RiLogoutBoxRLine />
        },
    ]

    return (
        <div className=' h-full  bg-green-400 rounded-2xl'>
            <div className='flex justify-center'>
                <div className='h-[70px] w-[70px] mt-4 rounded-full relative cursor-pointer group'>
                    <picture>
                        <img className='w-full h-full rounded-full object-cover' src={proPic} alt='proPic' />
                    </picture>
                    <div className='absolute hidden group-hover:block left-[30%] top-1/2 text-3xl text-white'>
                        <TiUpload />
                    </div>
                </div>
            </div>
            {/* navigation icon */}
            <div className='flex flex-col gap-y-3 items-center justify-center mt-8'>
                {navigationIcon?.map(({ icon, id, path }, index) => (
                    <Link to={path} className={navigationIcon.length - 1 == index ? 'active text-5xl text-white mt-20 cursor-pointer' : 'text-5xl text-white cursor-pointer'} key={id}>
                        {icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar