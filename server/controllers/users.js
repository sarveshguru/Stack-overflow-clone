import mongoose from "mongoose";
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joindOn: users.joindOn })
        });
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const updateProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })
        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}


export const BecomeFriend = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('id unavailable...');
    }
  
    try {
      const currentUser = await User.findById(userId);
      const friendUser = await User.findById(_id);
  
      const currentUserUpIndex = currentUser.addFriend.findIndex((id) => id === String(_id));
      const currentUserDownIndex = currentUser.noFriend.findIndex((id) => id === String(_id));
  
      const friendUserUpIndex = friendUser.addFriend.findIndex((id) => id === String(userId));
      const friendUserDownIndex = friendUser.noFriend.findIndex((id) => id === String(userId));
  

      if (value === 'addFriend') {
        if (currentUserDownIndex !== -1) {
          currentUser.noFriend = currentUser.noFriend.filter((id) => id !== String(_id));
        }
        if (currentUserUpIndex === -1) {
          currentUser.addFriend.push(_id);
        } else {
          currentUser.addFriend = currentUser.addFriend.filter((id) => id !== String(_id));
        }
  
        if (friendUserDownIndex !== -1) {
          friendUser.noFriend = friendUser.noFriend.filter((id) => id !== String(userId));
        }
        if (friendUserUpIndex === -1) {
          friendUser.addFriend.push(userId);
        } else {
          friendUser.addFriend = friendUser.addFriend.filter((id) => id !== String(userId));
        }
      } else if (value === 'noFriend') {
        if (currentUserUpIndex !== -1) {
          currentUser.addFriend = currentUser.addFriend.filter((id) => id !== String(_id));
        }
        if (currentUserDownIndex === -1) {
          currentUser.noFriend.push(_id);
        } else {
          currentUser.noFriend = currentUser.noFriend.filter((id) => id !== String(_id));
        }
  
        if (friendUserUpIndex !== -1) {
          friendUser.addFriend = friendUser.addFriend.filter((id) => id !== String(userId));
        }
        if (friendUserDownIndex === -1) {
          friendUser.noFriend.push(userId);
        } else {
          friendUser.noFriend = friendUser.noFriend.filter((id) => id !== String(userId));
        }
      }
  
      await User.findByIdAndUpdate(userId, currentUser);
      await User.findByIdAndUpdate(_id, friendUser);
  
      res.status(200).json({ message: "voted successfully..." })
    } catch (error) {
      res.status(404).json({ message: "id not found" })
    }
  }
  