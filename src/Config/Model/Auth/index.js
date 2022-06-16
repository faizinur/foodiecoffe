import { log, POST } from '@Utils';

const authUser = async userData => {
    try {
        let loginData = await POST('/auth/login', userData)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: loginData,
        }
    } catch (e) {
        return {
            status: "FAILED",
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

const refreshToken = async () => {
    try {
        let newToken = await POST('/auth/refresh')
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: newToken,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
}

export {
    authUser,
    registerUser,
    refreshToken,
}