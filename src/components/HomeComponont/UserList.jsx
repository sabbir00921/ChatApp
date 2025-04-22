import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
    const db = getDatabase();
    const arrLength = 52;
    const [userList, setUserList] = useState()


    useEffect(() => {
        const userRef = ref(db, 'users/');
        let userArr = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                userArr.push({ ...item.val(), userKey: item.key })
            })
            setUserList(userArr)
        });
        console.log(userArr);

        //Cleanup finction
        return () => {
            const userRef = ref(db, 'users/');
        }
    }, [])
    // console.log(userList);


    return (
        <div className='w-[32%] mb-2 h-[48dvh] overflow-hidden bg-gray-200 px-2 pt-2  rounded-2xl'>
            {userList ? <div className=' shadow-2xl rounded-2xl h-full'>
                <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                    <h1 className=''>User List<span className='ml-1 rounded-full bg-blue-500 p-[2px] font-normal text-white'>{userList.length}</span></h1>
                    <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                </div>
                <div className='overflow-y-scroll h-[43dvh] '>
                    {userList?.map((user, index) => (
                        <div className={userList.length - 1 == index ? 'flex justify-between items-center p-2 pr-4' : 'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
                            <div className='w-[40px] h-[40px]  cursor-pointer'>
                                <picture>
                                    <img className='rounded-full h-10 w-10 border-[1px] object-cover' src={user?.profile_picture} alt="" />
                                </picture>
                            </div>
                            <div className='w-[55%]' >
                                <h1 className='font-bold'>{user.username || "Set Name"}</h1>
                                <p className='text-sm'>how are you?</p>
                            </div>
                            <div>
                                <button type="button" class="text-white  bg-blue-500   font-medium  text-sm rounded-lg  p-2 text-center cursor-pointer"><FaPlus /></button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
                :
                <div className='shadow-2xl rounded-2xl h-full'>
                    <div className='flex items-center justify-between p-2 font-black shadow-2xl rounded-2xl'>
                        <h1 className=''>
                            User List
                            <span className='ml-1 rounded-full bg-blue-500 p-[2px] font-normal text-white'>0</span>
                        </h1>
                        <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                    </div>
                    <div className='overflow-y-scroll h-[43dvh]'>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className='flex justify-between items-center p-2 pr-4 border-b-[1px] animate-pulse'>
                                <div className='w-[40px] h-[40px] bg-gray-300 rounded-full'></div>
                                <div className='w-[55%]'>
                                    <div className='h-4 bg-gray-300 rounded w-3/4 mb-1'></div>
                                    <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                                </div>
                                <div>
                                    <div className='w-8 h-8 bg-blue-300 rounded-lg'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>

    )

}
export default UserList
