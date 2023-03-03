import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')

    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
        if (User === null) {
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        } else{
            if (questionTitle === '' && questionBody === '' && questionTags === '') {
                alert('Enter question -title, question-body, question-tags before submitting')
            } else {
                // console.log({questionTitile, questionBody, questionTags})
                dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
            }
        }    
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you'r asking a question to another person</p>
                            <input type="text" placeholder='e.g. Is there an R function the index of an element in a vector?' id="ask-ques-title" onChange={(e) => { setQuestionTitle(e.target.value) }} required />
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea id="ask-ques-body" cols="30" rows="10" onKeyDown={handleEnter} onChange={(e) => { setQuestionBody(e.target.value) }} required></textarea>
                        </label>

                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" placeholder='e.g. (xml typescript wordpress)' id="ask-ques-tags" onChange={(e) => { setQuestionTags(e.target.value.split(" ")) }} required />
                        </label>
                    </div>
                    <input type="submit" value="Review your question" className='review-btn' />
                </form>
            </div>
        </div>
    )
}

export default AskQuestion
