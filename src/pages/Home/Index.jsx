import React from 'react'
import GroupList from '../../components/HomeComponont/GroupList'
import Friends from '../../components/HomeComponont/Friends'
import UserList from '../../components/HomeComponont/UserList'
import FriendRequest from '../../components/HomeComponont/FriendRequest'
import Group from '../../components/HomeComponont/Group'
import BlockedUser from '../../components/HomeComponont/BlockedUser'


const Index = () => {
  return (
    <div className='flex justify-between flex-wrap mx-3 '>
        <GroupList />
        <Friends />
        <UserList />
        <FriendRequest />
        <Group />
        <BlockedUser />
      
    </div>
  )
}

export default Index
