import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv";

import userRoutes from './routes/users.js'
import questionsRoutes from './routes/Quesrions.js'
import answerRoutes from './routes/Answers.js'
import postsRoutes from './routes/Posts.js'
// import subsRoutes from './routes/subs.js'

mongoose.set('strictQuery', false);


dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());



app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})


app.use('/user', userRoutes)
app.use('/questions', questionsRoutes)
app.use('/answer', answerRoutes)
app.use('/posts', postsRoutes)
// app.use('/subs', subsRoutes)    


const port =  5000 || PORT




const DATABASE_URL = process.env.CONNECTION_URL


mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => { console.log(`server running on port ${port}`) }))
    .catch((err) => console.log(err.message))