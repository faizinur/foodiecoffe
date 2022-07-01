import { SET_USER } from '../../Actions/types'

const initialState = {
    user: {
        email: "",
        id: "",
        image: {
            name: "",
            title: "",
            url: ""
        },
        merchantId: "",
        name: "",
        role: "",
        username: ""
    },
    token: {
        access_token: "",
        refresh_token: "",
    }
}

export default userReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
}
