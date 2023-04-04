import React from 'react'

import '../../App.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import CommunityFeed from '../../components/CommunityNavbar/CommunityFeed'

const Community = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />

            <div className='home-container-2'>
                <CommunityFeed />
                <RightSidebar />
            </div>
        </div>
    )
}
export default Community
