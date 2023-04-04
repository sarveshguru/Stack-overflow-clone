import express from 'express'

import { CreatePost, getsAllPosts, postLiked} from '../controllers/Posts.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/Create', CreatePost)
router.get("/gets", getsAllPosts)
router.patch('/likes/:id', auth, postLiked)

export default router