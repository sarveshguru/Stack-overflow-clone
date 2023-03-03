import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import './UserProfile.css'
import Avatar from '../../components/Avatar/Avatar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => (state.usersReducer))
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="5px" py="28px" pz="130px">{currentProfile?.name.charAt(0).toUpperCase()}</Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joindOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='buttun' onClick={() => setSwitch(true)} className="edit-profile-btn">
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile
