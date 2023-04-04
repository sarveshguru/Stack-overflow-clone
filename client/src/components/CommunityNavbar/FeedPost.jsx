import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import copy from 'copy-to-clipboard'
import moment from 'moment'

import './Community.css'
import Avatar from '../Avatar/Avatar'

import { postLiked } from '../../actions/post'

const FeedPost = ({ post }) => {

    const videoRef = useRef(null);
    const location = useLocation()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const url = 'https://stack-overflow-sarvesh.netlify.app'

    const id = post._id

    // console.log(post.like.includes(User?.result._id));
    // console.log(User?.result._id);

    const handleShare = () => {
        copy(url + location.pathname)
        alert('Copied url: ' + url + location.pathname)
    }

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
        };
    }, [videoRef]);

    const handleLike = () => {
        if (User === null) {
            alert("logi or signup for liking any post")
            navigate('/Auth')
        } else {
            dispatch(postLiked(id, 'like', User.result._id))
        }
    }

    const handleUnLike = () => {
        dispatch(postLiked(id, 'unLike', User.result._id))
    }

    return (
        <div>
            {/* card */}
            <div className="card">

                {/* card-container */}
                <div className="card-container">

                    {/* card header */}
                    <div className="card-header">
                        <div className="card-profile">
                            <Link to={`/Users/${post.userId}`} style={{ textDecoration: "none" }}><Avatar backgroundColor='#159756' py='3.5px' px="0px" pz="35px" color="white" borderRadius="50%" fontSize="20px">{post.postPosted.charAt(0).toUpperCase()}</Avatar></Link>
                        </div>
                        <div className='name-time'>
                            <h3>{post.postPosted}</h3>
                            <p>{moment(post.postedOn).fromNow()}</p>
                        </div>
                    </div>

                    {/* card caption */}
                    <div className="card-caption">
                        <p>{post.postBody}</p>
                    </div>

                    {/* card image */}
                    {
                        post.photo !== "No photo" && (
                            <div className="card-image">
                                {
                                    post.photo.match(/\.(jpeg|jpg|gif|png)$/) != null ?
                                        <img src={post.photo} alt="" />
                                        : <video src={post.photo} alt="" ref={videoRef} loop autoPlay />
                                }
                            </div>
                        )
                    }

                    {/* card-content */}
                    <div className="card-content">
                        <div className="card-span">
                            {
                                post.like.includes(User?.result._id) ? (
                                    <span className="material-symbols-outlined material-symbols-outlined-blue" onClick={handleUnLike}>
                                        thumb_up_off
                                    </span>
                                ) : (
                                    <span className="material-symbols-outlined" onClick={handleLike}>
                                        thumb_up_off
                                    </span>
                                )
                            }
                            <span className="material-symbols-outlined" onClick={handleShare}>
                                share
                            </span>
                        </div>
                        <p>{post.like.length} Like</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPost
