import React from 'react'

import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from './UsersList'

const Users = () => {

  return (
    <div className='home-container-1'>
      <LeftSideBar />

      <div className='home-container-2'>
        <h1 style={{ marginTop: '50px', fontWeight: '400' }}>Users</h1>
        <UsersList />
      </div>
    </div >
  )
}

export default Users
