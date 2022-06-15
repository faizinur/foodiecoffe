import { Auth } from '@Model';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@Actions';
import { reset } from '@RootNavigation';
import { log, MyRealm } from '@Utils';
export default () => {
    const { authUser } = Auth;
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const _submitLogin = useCallback(async userData => {
        try {
            setLoading(true)
            setAuthError('')
            const { status, data: { user, token }, message } = await authUser(userData);
            if (status != 'SUCCESS') throw message;
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

    return {
        _submitLogin,
        _submitRegister,
        loading,
        authError,
    }
}

