import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from 'firebase/auth';
import moment from 'moment';

const Friends = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [friendList, setfriendList] = useState();


    // fetch data from Friens

    useEffect(() => {
        const friendsRef = ref(db, 'friendsList/');
        let friendsArr = [];
        onValue(friendsRef, (snapshot) => {
            snapshot.forEach((friends) => {
                if (auth?.currentUser.uid == friends.val()?.reciver.userid) {

                    friendsArr.push({ ...friends.val(), frKey: friends.key })
                }
            })
            setfriendList(friendsArr)
        });

        //Cleanup finction
        return () => {
            const friendsRef = ref(db, 'friendsList/');
        }
    }, [])
    console.log(friendList);

    return (
        <div className='w-[32%] mb-2 h-[48dvh] overflow-hidden bg-gray-200 px-2 pt-2  rounded-2xl'>
            {friendList ?
                <div className=' shadow-2xl rounded-2xl h-full'>
                    <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                        <h1 className=''>Friends<span className='ml-1 rounded-full bg-blue-500 p-[2px]q font-normal text-white'>{friendList?.length}</span></h1>
                        <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                    </div>
                    <div className='overflow-y-scroll h-[43dvh] '>
                        {friendList?.map((item, index) => (
                            <div className={friendList?.length - 1 == index ? 'flex justify-between items-center p-2 pr-4' : 'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
                                <div className='w-[40px] h-[40px] rounded-full  cursor-pointer'>
                                    <picture>
                                        <img className='w-full h-full rounded-full border-[1px] object-cover' src={item?.sender?.profile_picture} alt="" />
                                    </picture>
                                </div>
                                <div className='w-[55%] '>
                                    <h1 className='font-bold'>{item?.sender.username}</h1>
                                    <p className='text-sm'>Start chating...</p>
                                </div>
                                <div className='w-[25%]'>
                                    <p className='text-sm text-gray-800  text-center'>{item?.crearedAt}</p>
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
                                    <div className='w-8 h-8  rounded-lg'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    )
}

export default Friends
