import { Auth } from '@Model';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@Actions';
import { reset } from '@RootNavigation';
import { log, MyRealm } from '@Utils';
export default () => {
    const { authUser, refreshToken } = Auth;
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
            if (user.id === '' && token.access_token === '') throw 'Login FAILED.'
            dispatch(setUser({ user, token }));
            setLoading(false)
            await MyRealm.insertData({ key: 'userData', value: JSON.stringify({ user, token }) })
            reset('Home');
        } catch (err) {
            log('err : ', err)
            setAuthError(`error Auth ${err}`)
            setLoading(false)
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
        }
    }, [])

    const _getUserData = useCallback(async () => {
        try {
            let data = await MyRealm.selectData()
            if (data.length == 0) throw ('Data Tidak ditemukan');
            return Promise.resolve(JSON.parse(data[0].value));
        } catch (err) {
            return Promise.reject(err);
        }
    }, [])

    const _refreshToken = useCallback(async (token) => {
        try {
            let { status, message, data } = await refreshToken(token)
            return Promise.resolve({ token: data })
        } catch (err) {
            return Promise.reject(err);
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

