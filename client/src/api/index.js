import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' }) //'https://stack-overflow-clone-eke8.onrender.com'    //

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization =`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req; //Based on the Axios Documentation - Interceptors, the interceptor function should return the req
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);
 
export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestion = () => API.get('/questions/get'); 
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId })

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId })
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers })

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
export const BecomeFriend = (id, value, userId) => API.patch(`/user/beFriends/${id}`, {value, userId});

export const sharePost = (postData) => API.post('/posts/Create', postData);
export const getsAllPost = () => API.get('/posts/gets');
export const postLiked = (id, value, userId) => API.patch(`/posts/likes/${id}`, {value, userId});

