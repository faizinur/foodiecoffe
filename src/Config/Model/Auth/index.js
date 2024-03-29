import { log, POST, MyRealm } from '@Utils';
import { APP_CONFIG, PRODUCT, ORDER, TRANSACTION, NEW_ORDER } from '@Utils/Realm/types';
const authUser = async userData => {
    try {
        let loginData = await POST('auth/login', userData)
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

const refreshToken = async token => {
    let data = await POST('auth/refresh', token);
    return {
        status: 200,
        message: 'MODEL refreshToken',
        data,
    }
}

const getUserData = async () => {
    try {
        let data = await MyRealm.selectData(APP_CONFIG, appConfig => appConfig.filter(({ key }) => key == 'userData'));
        return data.length > 0 ? JSON.parse(data[0]?.value) : null;
    } catch (err) {
        log('getUserData ', err)
        return err;
    }
}

const setUserData = async userData => {
    try {
        await MyRealm.insertData(APP_CONFIG, { id: MyRealm._newBSON(), key: 'userData', value: JSON.stringify(userData) })
        return true;
    } catch (err) {
        log('setUserData', err)
        return err;
    }
}

const updateUserData = async userData => {
    try {
        const [{ configId }] = await MyRealm.selectData(APP_CONFIG)
        await MyRealm.updateData(APP_CONFIG, { id: configId, value: JSON.stringify(userData) })
        return true;
    } catch (err) {
        return err;
    }
}

const logOut = async () => {
    try {
        await Promise.all([APP_CONFIG, PRODUCT, ORDER, TRANSACTION, NEW_ORDER].map(key => MyRealm.deleteData(key)))
        return true
    } catch (err) {
        return err
    }
}
export {
    authUser,
    getUserData,
    setUserData,
    registerUser,
    refreshToken,
    logOut,
    updateUserData,
}