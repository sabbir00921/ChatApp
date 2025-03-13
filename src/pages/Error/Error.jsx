import React from 'react'
import { IoWarningOutline } from 'react-icons/io5'

const Error = () => {
    return (
        <div className='flex flex-col font-bold justify-center items-center h-full bg-yellow-400 '>
            <span className='text-9xl text-red-600 '><IoWarningOutline /></span>
            <p className=' text-5xl text-red-600'>This page is under Developement</p>
            <p>or</p>
            <p className=' text-5xl text-red-600'>404 not found.</p>
        </div>
    )
}

export default Error
