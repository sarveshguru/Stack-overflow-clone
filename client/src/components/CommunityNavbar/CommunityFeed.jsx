import React from 'react'
import { useSelector } from 'react-redux'

import PostList from './PostList'

import './Community.css'

const CommunityFeed = () => {

    const postsList = useSelector(state => state.postsReducer)

    return (
        <div className='main-feed-page'>
            <h1>Community Feed</h1>
            <div>
                {
                    postsList.data === null ?
                        <h1>Loading...</h1> :
                        <>
                            < PostList postsList={postsList.data} />
                        </>
                }
            </div>
        </div>
    )
}

export default CommunityFeed
