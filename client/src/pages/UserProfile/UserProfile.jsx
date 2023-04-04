import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen, faAdd, faXmark } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import './UserProfile.css'
import Avatar from '../../components/Avatar/Avatar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'

import { BecomeFriend } from '../../actions/users'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => (state.usersReducer))
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const currentuserProfile = users.filter((user) => user._id === currentUser?.result?._id)[0]

    const [Switch, setSwitch] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        if (currentProfile && currentuserProfile) {
            const isFriend = currentuserProfile.addFriend.includes(currentProfile._id);
            setIsFriend(isFriend);
        }
    }, [currentProfile, currentuserProfile]);

    const handleAddFriend = () => {
        if (currentUser === null) {
            alert("logi or signup for liking any post")
            navigate('/Auth')
        } else {
            dispatch(BecomeFriend(id, 'addFriend', currentUser.result._id))
        }
    }

    const handleRemoveFriend = () => {
        dispatch(BecomeFriend(id, 'noFriend', currentUser.result._id))
    }

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

                                {/* community-profile-info */}

                                <div className="user-details">

                                    <div className="user-info">
                                        <h3>{currentProfile?.addFriend?.length}</h3>
                                        {
                                            currentProfile?.addFriend?.length > 1 ? (

                                                <p>Friends</p>
                                            ) : (

                                                <p>Friend</p>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>


                        {
                            currentUser?.result._id === id ? (
                                <button type='button' onClick={() => setSwitch(true)} className="edit-profile-btn">
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) : (
                                <>
                                    {
                                        currentUser !== null && (

                                            <>
                                                {
                                                    isFriend ? (
                                                        <button type='button' className="edit-profile-btn remove-frd" onClick={handleRemoveFriend}>
                                                            <FontAwesomeIcon icon={faXmark} /> Remove Friend
                                                        </button>
                                                    ) : (
                                                        <button type='button' className="edit-profile-btn add-frd" onClick={handleAddFriend}>
                                                            <FontAwesomeIcon icon={faAdd} /> Add Friend
                                                        </button>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
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

            </div >
        </div >
    )
}

export default UserProfile
