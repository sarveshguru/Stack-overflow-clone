import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    postBody: { type: String, required: "Post must have a body" },
    photo: { type: String, default: "No photo" },
    like: { type: [String], default: [] },
    unLike: { type: [String], default: [] },
    postPosted: { type: String, required: "Post must have an author" },
    userId: { type: String },
    postedOn: { type: Date, default: Date.now },
})

export default mongoose.model("Post", PostSchema)
