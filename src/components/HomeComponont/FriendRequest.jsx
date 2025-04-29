import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import lib from "../../lib/Signupdata"
import { getAuth } from 'firebase/auth';
import moment from 'moment';

const FriendRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    const [frReqList, setfrReqList] = useState();
    const [friendList, setfriendList] = useState();

    // fetch data from frRequest
    useEffect(() => {
        const userRef = ref(db, 'frRequest/');
        onValue(userRef, (snapshot) => {
            let frReqArr = [];
            snapshot.forEach((frReq) => {

                if (auth.currentUser.uid == frReq?.val().reciver.userid) {
                    frReqArr.push({ ...frReq.val(), frKey: frReq?.key })
                }


            })
            setfrReqList(frReqArr)
        });
        // console.log(frReqList);

        //Cleanup finction
        return () => {
            const userRef = ref(db, 'frRequest/');
        }
    }, [])
    // console.log(frReqList);
    // console.log(frReqList);
    const handleAccept = (friend) => {
        

        // store data for friendsList
        set(push(ref(db, 'friendsList/')), {
            reciver: {
                email: auth?.currentUser?.email || "missing",
                profile_picture: auth?.currentUser?.photoURL || "null",
                userid: auth?.currentUser?.uid || "null",
                username: auth?.currentUser?.displayName || "null"
            },
            sender: {
                email: friend?.sender.email || "missing",
                profile_picture: friend?.sender?.profile_picture || "null",
                userid: friend?.sender?.userid || "null",
                username: friend?.sender?.username || "null"
            },
            crearedAt: lib.getTime(),
            friendsUid: `${friend?.reciver?.userid}${friend?.sender?.userid}`
        });
        // remove data from frRequest
        const frRef = ref(db, `frRequest/${friend.frKey}`);
        remove(frRef)
        // console.log(friend);

    }
    // console.log(frReqList)

    // fetch data from Friens

    useEffect(() => {
        const friendsRef = ref(db, 'friendsList/');
        onValue(friendsRef, (snapshot) => {
            let friendsArr = [];
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


    return (
        <div className='w-[32%] mb-2 h-[48dvh] overflow-hidden bg-gray-200 px-2 pt-2  rounded-2xl'>
            {frReqList ? <div className=' shadow-2xl rounded-2xl h-full'>
                <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                    <h1 className=''>Friend Request<span className='ml-1 rounded-full bg-blue-500 p-[2px] font-normal text-white'>{frReqList?.length}</span></h1>
                    <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                </div>
                <div className='overflow-y-scroll h-[43dvh] '>
                    {frReqList?.map((friend, index) => (
                        <div className={frReqList?.length - 1 == index ? 'flex justify-between items-center p-2 pr-4' : 'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
                            <div className='w-[40px] h-[40px] cursor-pointer'>
                                <picture className=''>
                                    <img className='w-[40px] h-[40px] rounded-full border-[1px] object-cover' src={friend?.sender?.profile_picture
                                    } alt="" />
                                </picture>
                            </div>
                            <div className='w-[55%]'>
                                <h1 className='font-bold'>{friend?.sender?.username}</h1>
                                <p className='text-sm'>{friend?.crearedAt}, {moment(friend?.crearedAt).fromNow()}

                                </p>
                            </div>
                            <div className='flex gap-x-2'>
                                <button type="button" onClick={() => { handleAccept(friend) }} class="text-white  bg-blue-500   font-medium rounded-lg text-sm px-2 py-1 text-center cursor-pointer">Accept</button>
                                <button type="button" class="text-white  bg-red-500   font-medium rounded-lg text-sm px-2 py-1 text-center cursor-pointer">Reject</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div> :
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

export default FriendRequest
