import { Alert } from 'react-native';
import { Auth } from '@Model';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@Actions';
import { reset } from '@RootNavigation';
import { log } from '@Utils';
export default () => {
    const { authUser, refreshToken, getUserData, setUserData, logOut, updateUserData } = Auth;
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const _saveProfile = () => {
        log('_saveProfile')
    }

    const _submitLogin = useCallback(async userData => {
        try {
            setLoading(true)
            setAuthError('')
            const { status, data, message } = await authUser(userData);
            if (status != 'SUCCESS') throw message;
            const { user, token } = data;
            if (user.id === '' && token.access_token === '') throw `Login FAILED. ${message}`;
            dispatch(setUser({ user, token }));
            setLoading(false)
            await setUserData({ user, token });
            reset('Home');
        } catch (err) {
            log('err : ', err)
            setAuthError(`error Auth ${err}`)
            setLoading(false)
        }
    }, [authError, loading])

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
    }, [authError, loading])

    const _getUserData = async () => {
        let data = await getUserData();
        if (data == null) return Promise.reject(null);
        dispatch(setUser(data));
        return Promise.resolve(data);
    }

    const _refreshToken = async oldToken => {
        try {
            const { data: token } = await refreshToken(oldToken);
            log('_refreshToken', token)
            if (token == null) return Promise.resolve('TOKEN BELUM EXPIRED');
            const userData = await getUserData();
            global.showToast('token di perbaharui');
            await updateUserData({ ...userData, token: token });
            dispatch(setUser({ ...userData, token }));
            return Promise.resolve('OK')
        } catch (err) {
            // global.showToast(JSON.stringify(err));
            return Promise.reject('FAILED');
        }
    }

    const _logOut = () => {
        log('_onLogOut : ');
        Alert.alert(
            'Foodie Coffe',
            'Mau keluar nih?',
            [{
                text: "Batal", onPress: () => log("Cancel Pressed"), style: "cancel"
            },
            {
                text: "Mau aja", onPress: async () => {
                    await logOut()
                    dispatch(setUser({
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
                    }));
                    reset('Splash')
                }
            }]
        )
    }


    return {
        _submitLogin,
        _submitRegister,
        loading,
        authError,
        _getUserData,
        _refreshToken,
        _logOut,
        _saveProfile,
    }
}

