import { log, POST, MyRealm } from '@Utils';
import { APP_CONFIG } from '@Utils/Realm/types';
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
        let newToken = await POST('auth/refresh', token);
        return {
            status: newToken?.status,
            message: newToken?.message || 'Got New Token',
            data: newToken?.status == 200 ? newToken?.token : null,
        }
    } catch (err) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
}

const getUserData = async () => {
    try {
        let data = await MyRealm.selectData(APP_CONFIG)
        return data.length > 0 ? JSON.parse(data[0]?.value) : null;
    } catch (err) {
        log('getUserData ', err)
        return err;
    }
}

const setUserData = async ({ user, token }) => {
    try {
        await MyRealm.insertData({ key: 'userData', value: JSON.stringify({ user, token }) })
        return true;
    } catch (err) {
        return err;
    }
}

export {
    authUser,
    getUserData,
    setUserData,
    registerUser,
    refreshToken,
}