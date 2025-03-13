import React from 'react'
import Sidebar from '../../components/HomeComponont/Sidebar'
import { Outlet } from 'react-router'

const Index = () => {
  return (
    <div className='flex p-5 h-screen'>
      <div className='w-[110px] '>
        <Sidebar />
      </div>
      <div className=' w-full bg-gray-200'>
        <Outlet />
      </div>
    </div>
  )
}

export default Index
