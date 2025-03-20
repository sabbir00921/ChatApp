import React from 'react'
import avatar from "../../images/avatar.png"
import { HiOutlineDotsVertical } from 'react-icons/hi'

const GroupList = () => {
    const arrLength = 10;
    return (
            <div  className = 'w-[32%] mb-2  bg-gray-200 px-2 pb-2 pt-2 rounded-2xl overflow-hidden' >
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-3 ps-10 text-sm bg-white text-gray-900 rounded-2xl outline-0 border-gray-300 border-[2px]" placeholder="Search ..." required />
                </div>

            {/* GroupList */ }
            <div className = 'mt-3 shadow-2xl rounded-2xl' >
                <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                    <h1 className=''>Group List <span className='ml-1 rounded-full bg-blue-500 p-[2px] font-normal text-white'>{arrLength}</span></h1>
                    <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                </div>
                <div className='overflow-y-scroll h-[28dvh] '>
                    {[...new Array(arrLength)].map((_, index) => (
                        <div className={arrLength-1 ==index? 'flex justify-between items-center p-2 pr-4':'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
                            <div className='w-[40px] h-[40px]  cursor-pointer'>
                                <picture>
                                    <img className='rounded-full border-[1px] object-cover' src="https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c" alt="" />
                                </picture>
                            </div>
                            <div >
                                <h1 className='font-bold'>Sabbir hossain</h1>
                                <p className='text-sm'>how are you?</p>
                            </div>
                            <div>
                                <button type="button" class="text-white  bg-blue-500   font-medium rounded-lg text-sm px-5 py-1 text-center cursor-pointer">Join</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div >
        </div >
    )
}

export default GroupList