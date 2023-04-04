import React from 'react'
import FeedPost from './FeedPost'

const PostList = ({postsList}) => {
  return (
    <>
      {
        postsList.map((post) => (
            <FeedPost post = {post} key={post._id} />
          ))
      }
    </>
  )
}

export default PostList
