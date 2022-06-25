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

const refreshToken = async (token) => {
    try {
        let newToken = await POST('auth/refresh', token)
        return {
            status: newToken?.status,
            message: newToken?.message || 'Got New Token',
            data: newToken?.status == 200 ? newToken?.token : null,
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