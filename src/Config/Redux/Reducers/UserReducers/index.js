import { SET_USER } from '../../Actions/types'

const initialState = {
    user: {
        id: "-",
        name: "-",
        username: "-",
        image: {
            title: "-",
            name: "-",
            url: "-",
        },
        email: "-",
        role: "-",
        merchantId: "-",
    },
    token: {
        access_token: "-",
        refresh_token: "-",
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
