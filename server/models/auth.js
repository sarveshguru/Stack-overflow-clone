import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joindOn: {type: Date, default: Date.now},
    addFriend: { type: [String], default: [] },
    noFriend: { type: [String], default: [] }
})

export default mongoose.model("User", userSchema)