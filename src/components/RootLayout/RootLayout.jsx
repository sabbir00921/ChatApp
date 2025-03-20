import React from 'react'
import Sidebar from '../HomeComponont/Sidebar'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <div className='flex p-5 h-screen gap-x-1'>
            <div className='w-[110px] '>
                <Sidebar />
            </div>
            <div className=' w-full bg-white-500 h-full  rounded-2xl overflow-hidden'>
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout
