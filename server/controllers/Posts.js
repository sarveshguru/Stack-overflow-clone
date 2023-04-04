import Posts from '../models/Posts.js'
import mongoose from 'mongoose';

export const CreatePost = async (req, res) => {
    const sharePostData = req.body;
    const sharePost = new Posts(sharePostData);
    try {
        await sharePost.save();
        res.status(200).json("Posted a post successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new post")
    }
}

export const getsAllPosts = async (req, res) => {
    try {
        const postList = await Posts.find();
        res.status(200).json(postList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const postLiked = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('post unavailable...');
    }

    try {
        const post = await Posts.findById(_id)
        const upIndex = post.like.findIndex((id) => id === String(userId))
        const downIndex = post.unLike.findIndex((id) => id === String(userId))

        if (value === 'like') {
            if (downIndex !== -1) {
                post.unLike = post.unLike.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                post.like.push(userId)
            } else {
                post.like = post.like.filter((id) => id !== String(userId))
            }
        }

        else if (value === 'unLike') {
            if (upIndex !== -1) {
                post.like = post.like.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                post.unLike.push(userId)
            } else {
                post.unLike = post.unLike.filter((id) => id !== String(userId))
            }
        }
        await Posts.findByIdAndUpdate(_id, post)
        res.status(200).json({ message: "voted successfully..." })
    } catch (error) {
        res.status(404).json({ message: "id not found" })
    }
}