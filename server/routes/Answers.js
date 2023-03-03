import express from 'express'

import { postAnswers, deleteAnswers  } from '../controllers/Answers.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.patch("/post/:id", auth, postAnswers)
router.patch("/delete/:id", auth, deleteAnswers)



export default router
