import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import lib from "../../lib/Signupdata"


const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();
    const arrLength = 52;
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [frReqList, setfrReqList] = useState([]);

    // fetch user data from DB
    useEffect(() => {
        const userRef = ref(db, 'users/');
        let userArr = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                
                if (auth?.currentUser.uid !== item.val().userid) {
                    userArr.push({ ...item.val(), userKey: item.key })
                }
                else {
                    setCurrentUser({ ...item.val(), userKey: item.key })
                }
            })
            setUserList(userArr)
        });

        //Cleanup finction
        return () => {
            const userRef = ref(db, 'users/');
        }
    }, [userList])



    // fetch frReqList data from DB
    useEffect(() => {
        const frReqRef = ref(db, 'frRequest/');
        let frReqArr = [];
        onValue(frReqRef, (snapshot) => {
            // console.log(auth?.currentUser.uid);
            snapshot.forEach((frnd) => {
                // console.log(frnd?.val().reciver.userid);


                if (auth?.currentUser.uid == frnd?.val().reciver.userid) {
                    // console.log(frnd.val());

                    frReqArr.push(auth?.currentUser?.uid.concat(frnd?.val()?.sender?.userid))
                }
                else {
                    // console.log("recive");
                }

            })
            setfrReqList(frReqArr)
        });

        return () => {
            const userRef = ref(db, 'frRequest/');
        }
    }, [frReqList])
    // console.log(frReqList);

    // handleFrReq function implement
    const handleFrReq = (user) => {
        // console.log(user);

        set(push(ref(db, 'frRequest/')), {
            sender: {
                email: auth?.currentUser?.email || "missing",
                profile_picture: auth?.currentUser?.photoURL || "null",
                userid: auth?.currentUser?.uid || "null",
                username: auth?.currentUser?.displayName || "null"
            },
            reciver: {
                email: user?.email || "missing",
                profile_picture: user?.profile_picture || "null",
                userid: user?.userid || "null",
                username: user?.username || "null"
            },
            crearedAt: lib.getTime()
        }).then(() => {
            set(push(ref(db, 'notification/')), {
                notification: `${currentUser?.email} sent a friend request`,
                crearedAt: lib.getTime()
            }).then(() => {
                lib.SuccessToast(`friend request sent to ${user?.username}`)
            }).catch((err) => {
                console.log("notification err", err);

            })
        }).catch((err) => {
            console.log("frRequestotification err", err);

        })

    }
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
                                <button type="button" onClick={() => { handleFrReq(user) }} class="text-white  bg-blue-500   font-medium  text-sm rounded-lg  p-2 text-center cursor-pointer"><FaPlus /></button>
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
