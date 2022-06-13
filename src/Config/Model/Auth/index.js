import { log } from '@Utils';
import axios from 'axios';

const authUser = async data => {
    try {
        let res = await axios.post('http://beta-api.foodie.coffee/auth/login', data)
        if (res.status == 202) {
            return {
                status: 'SUCCESS',
                message: 'API SUCCESS!',
                data: res.data,
            }
        } else {
            throw 'AXIOS ERR';
        }
    } catch (e) {
        return {
            status: "failed",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
};
const registerUser = data => {
    return {
        status: "success",
        message: "Berhasil",
        data,
    }
};

export {
    authUser,
    registerUser,
}