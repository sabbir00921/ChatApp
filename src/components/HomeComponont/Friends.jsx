import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const Friends = () => {
    const arrLength = 12;
    return (
        <div className='w-[32%] mb-2 h-[48dvh] overflow-hidden bg-gray-200 px-2 pt-2  rounded-2xl'>
            <div className=' shadow-2xl rounded-2xl h-full'>
                <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                    <h1 className=''>Friends<span className='ml-1 rounded-full bg-blue-500 p-[2px] font-normal text-white'>{arrLength}</span></h1>
                    <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                </div>
                <div className='overflow-y-scroll h-[43dvh] '>
                    {[...new Array(arrLength)].map((_, index) => (
                        <div className={arrLength - 1 == index ? 'flex justify-between items-center p-2 pr-4' : 'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
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
                                <p>Today, 8.56pm</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Friends
