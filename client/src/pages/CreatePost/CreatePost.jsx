import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import add_image from '../../assets/add-image.png'
import add_video from '../../assets/add-video.png'

import './CreatePost.css'
import { createPost } from '../../actions/post.js'

const CreatePost = () => {

    const [postBody, setPostBody] = useState('')
    const [photo, setPhoto] = useState('')

    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (User === null) {
            alert('Login or Signup to share a post')
            navigate('/Auth')
        } else {
            if (postBody === '') {
                alert('Enter caption before submitting')
            } else {
                if (photo !== '') {
                    const data = new FormData()
                    data.append("file", photo)
                    data.append("upload_preset", "stack-clone")
                    data.append("cloud_name", "stackclone")
                    // Check if the file being uploaded is an image or a video
                    const isImage = photo.type.startsWith('image/')
                    const cloudinaryEndpoint = isImage
                        ? "https://api.cloudinary.com/v1_1/stackclone/image/upload"
                        : "https://api.cloudinary.com/v1_1/stackclone/video/upload"

                    fetch(cloudinaryEndpoint,
                        {
                            method: "post",
                            body: data
                        }).then(res => res.json())
                        .then(data => {
                            const imageUrl = data.url;
                            dispatch(createPost({ postBody, photo: imageUrl, postPosted: User.result.name, userId: User?.result?._id }, navigate));
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setPostBody(postBody + "\n")
        }
    }

    return (
        <div className='create-post'>
            {/* card */}
            <div className="share-card">

                {/* card-container */}
                <div className="share-card-container">

                    {/* form div */}
                    <form className='post-form' onSubmit={handleSubmit}>
                        <div className="ask-caption">
                            <textarea id="caption" cols="30" rows="10" placeholder='Share something...' onKeyDown={handleEnter} onChange={(e) => { setPostBody(e.target.value) }}></textarea>
                        </div>

                        <div className="box-input">
                            <div className="image-upload">
                                <label htmlFor="file_image">
                                    <img src={add_image} alt='add_image' />
                                </label>

                                <input id="file_image" type="file" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} />

                            </div>

                            <div className="image-upload">
                                <label htmlFor="file_video">
                                    <img src={add_video} alt='add_video' />
                                </label>

                                <input id="file_video" type="file" accept='video/*' onChange={(e) => setPhoto(e.target.files[0])} />
                            </div>

                            <button type='button' className='post-cancel-btn' onClick={() => navigate('/Community')}>Cancel</button>
                            <input type="submit" value="Post" className='post-btn' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost

