import * as api from '../api'

export const createPost = (postData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.sharePost(postData)
        dispatch({ type: "SHARE_POST", payload: data })
        dispatch(fetchAllPosts())
        navigate('/Community')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getsAllPost()
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const postLiked = (id, value, userId) => async (dispatch) => {
    try {
        /*const { data } = */await api.postLiked(id, value, userId)
        dispatch(fetchAllPosts())
    } catch (error) {
        console.log(error)
    }
}

