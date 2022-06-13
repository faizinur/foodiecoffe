import { Auth } from '@Model';
import React, { useState, useCallback } from 'react';
import { log } from '@Utils';

import { reset } from '@RootNavigation';

export default () => {
    const { authUser } = Auth;
    const [authError, setAuthError] = useState('');

    const _submitLogin = useCallback(async userData => {
        try {
            const { status, data, message } = await authUser(userData)
            if (status != 'SUCCESS') throw message;
            log(data)
            // reset('Home')
        } catch (err) {
            log(' _submitLogin : ', err)
            Promise.all([
                // setAuthError(`error Auth ${err}`)
            ])
        }
    }, [])


    const _submitRegister = useCallback(async userData => {
        try {
            const { status, message } = await authUser(userData)
            if (status != 'success') throw message;
            reset('Home')
        } catch (err) {
            Promise.all([
                setAuthError(`error Auth ${err}`)
            ])
        }
    }, [])

    return {
        _submitLogin,
        _submitRegister,
        authError,
    }
}

