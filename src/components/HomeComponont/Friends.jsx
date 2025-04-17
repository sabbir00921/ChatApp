import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const Friends = () => {

    const userList = [
        { id: 1, name: "John", message: "Hello! How are you?", time: "Today ,07:55 PM", imgUrl: "https://photosbulk.com/wp-content/uploads/2024/08/hijab-girl-pic_108.webp" },
        { id: 2, name: "Sarah", message: "Good morning!", time: "09:25 AM", imgUrl: "data:image/jpeg;base64,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" },
        { id: 3, name: "David", message: "Have a great day!", time: "05:45 AM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQm8ABc-itbWar2j_wkyhj08taafV5VQXR-Q&s" },
        { id: 4, name: "Emily", message: "Let's catch up later.", time: "03:15 pM", imgUrl: "https://i.pinimg.com/736x/4d/d5/96/4dd5961aae2eb1c265299d4e1a27212f.jpg" },
        { id: 5, name: "Michael", message: "Happy birthday!", time: "04:23 AM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NxzcnLLTpznqKsLuL0uFEriOHGu3evce4ARSkHYRcZneE0atb6tZ393PMnKzyYOp3nI&usqp=CAU" },
        { id: 6, name: "Sophia", message: "Good luck with your project!", time: "07:55 AM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwPgZKOah7VIEpjTypXULBAbZXLglVVZDuZ_ozbcXJFjN2XaJzaKIIAPCCNUC-cRtHdT8&usqp=CAU" },
        { id: 7, name: "Daniel", message: "What's your plan for today?", time: "05:25 PM", imgUrl: "https://photosnow.net/wp-content/uploads/2024/04/beautiful-girl-photo_13.jpg" },
        { id: 8, name: "Olivia", message: "I'll call you later.", time: "01:45 AM", imgUrl: "https://i.pinimg.com/736x/94/fc/5e/94fc5e2403638711e3d4a47a4a1375ec.jpg" },
        { id: 9, name: "James", message: "Don't forget the meeting.", time: "12:25 AM", imgUrl: "https://www.panaprium.com/cdn/shop/articles/cute_rodeo_outfits_ladies_1000.jpg?v=1669347290" },
        { id: 10, name: "Isabella", message: "How was your weekend?", time: "08:35 AM", imgUrl: "data:image/jpeg;base64,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" },
        { id: 11, name: "Henry", message: "I'll be there in 10 minutes.", time: "05:52 PM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Mu5yKPeNr9pfQcsGveF2HDFOhPIHkfqh5w&s" },
        { id: 12, name: "Ava", message: "Can we reschedule?", time: "07:55 AM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR463rmWPRG1TlRT1CIQdna2E3NAhUxvQ0kvw&s" },
        { id: 13, name: "Ethan", message: "Great job on the presentation!", time: "07:55 AM", imgUrl: "https://m.behindwoods.com/tamil-movies/slideshow/10-types-of-girls-in-chennai/images/la-traditionalista.jpg" },
        { id: 14, name: "Mia", message: "Let's meet for lunch.", time: "07:55 AM", imgUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEieLGavB9TdRqdaDWOYdrwoh_DkmcTr16B1vbEcESpf8Ri2dzfa_m4raOGHW7vhLsMnswc9b2TCaVuPfobMgfiIVPV8wKyNAoufr9WXYk9NzbgFDO_keyhvfpRD3rxOPonc22y0c5jzN24/s1600/Tamil+nadu+software+engineer+girl+in+jeans+and+T-shirt.jpg" },
        { id: 15, name: "Alexander", message: "Please review the document.", time: "07:55 PM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlkUsN8kY76HYkcY635xGaYAb6HzdJg1xHOw&s" },
        { id: 16, name: "Charlotte", message: "I'm running a bit late.", time: "07:55 AM", imgUrl: "https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg" },
        { id: 17, name: "Lucas", message: "See you at the event.", time: "07:55 AM", imgUrl: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvb2wlMjBtZW58ZW58MHx8MHx8fDA%3D" },
        { id: 18, name: "Amelia", message: "I'll send you the details soon.", time: "07:55 AM", imgUrl: "https://peteandpedro.com/cdn/shop/articles/0_Featured_Haircuts_For_Men_1024x1024.jpg?v=1668875982" },
        { id: 19, name: "Benjamin", message: "Thanks for your help!", time: "07:55 AM", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnwf0LT1ts58csSCr5N05qmTHMYStVvWmOXQ&s" },
        { id: 20, name: "Harper", message: "I hope you're doing well!", time: "07:55 AM", imgUrl: "https://i.shgcdn.com/ce9ecc97-bfd7-442d-a9f2-eff8a45785c7/-/format/auto/-/preview/3000x3000/-/quality/lighter/" }
    ];

    return (
        <div className='w-[32%] mb-2 h-[48dvh] overflow-hidden bg-gray-200 px-2 pt-2  rounded-2xl'>
            <div className=' shadow-2xl rounded-2xl h-full'>
                <div className='flex items-center justify-between p-2 font-black  shadow-2xl rounded-2xl'>
                    <h1 className=''>Friends<span className='ml-1 rounded-full bg-blue-500 p-[2px]q font-normal text-white'>{userList.length}</span></h1>
                    <span className='cursor-pointer'><HiOutlineDotsVertical /></span>
                </div>
                <div className='overflow-y-scroll h-[43dvh] '>
                    {userList.map(({ id, name, message, time, imgUrl }, index) => (
                        <div className={userList.length - 1 == index ? 'flex justify-between items-center p-2 pr-4' : 'flex justify-between items-center p-2 pr-4 border-b-[1px]'}>
                            <div className='w-[40px] h-[40px] rounded-full  cursor-pointer'>
                                <picture>
                                    <img className='w-full h-full rounded-full border-[1px] object-cover' src={imgUrl} alt="" />
                                </picture>
                            </div>
                            <div className='w-[55%] '>
                                <h1 className='font-bold'>{name}</h1>
                                <p className='text-sm'>{message}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='text-sm text-gray-800 '>{time}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Friends
