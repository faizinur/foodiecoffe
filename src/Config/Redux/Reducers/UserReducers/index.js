import { SET_USER } from '../../Actions/types'

const initialState = {
    email: '',
    username: '',
    password: '',
}

export default userReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
}