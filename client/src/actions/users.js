import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updateData)
        dispatch({ type: 'UPDATE_CURRENT_USERS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const BecomeFriend = (id, value, userId) => async (dispatch) => {
    try {
       /* const { data } =*/ await api.BecomeFriend(id, value, userId)
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}
