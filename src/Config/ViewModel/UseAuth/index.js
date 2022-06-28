import { Auth } from '@Model';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@Actions';
import { reset } from '@RootNavigation';
import { log, MyRealm } from '@Utils';
export default () => {
    const { authUser, refreshToken, getUserData, setUserData } = Auth;
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const _submitLogin = useCallback(async userData => {
        try {
            setLoading(true)
            setAuthError('')
            const { status, data, message } = await authUser(userData);
            if (status != 'SUCCESS') throw message;
            const { user, token } = data;
            if (user.id === '' && token.access_token === '') throw `Login FAILED. ${message}`
            dispatch(setUser({ user, token }));
            setLoading(false)
            await setUserData({ user, token });
            reset('Home');
        } catch (err) {
            log('err : ', err)
            setAuthError(`error Auth ${err}`)
            setLoading(false)
            global.showToast(err);
        }
    }, [])

    const _submitRegister = useCallback(async userData => {
        try {
            setLoading(true)
            const { status, message } = await authUser(userData)
            if (status != 'success') throw message;
            setLoading(false)
            reset('Login')
        } catch (err) {
            setAuthError(`error Auth ${err}`)
            setLoading(false)
            global.showToast(err);
        }
    }, [])

    const _getUserData = async () => {
        let data = await getUserData();
        if (data == null) return Promise.reject(null);
        return Promise.resolve(data);
    }

    const _refreshToken = useCallback(async (userData) => {
        global.showToast('Refreshing Token');
        try {
            let { status, message, data } = await refreshToken(userData.token);

            if (status == 'FAILED') throw message;

            if (data == null) {
                global.showToast(message);
                return Promise.resolve('OK')
            }
            let newUserData = userData.token.access_token = data;
            await setUserData(newUserData);
            dispatch(setUser(newUserData));
            return Promise.resolve('OK')
        } catch (err) {
            global.showToast(err);
            return Promise.reject('FAILED');
        }
    }, [])

    return {
        _submitLogin,
        _submitRegister,
        loading,
        authError,
        _getUserData,
        _refreshToken,
    }
}

