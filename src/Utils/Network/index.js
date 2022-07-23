import React from 'react';
import { log, MyRealm } from '@Utils';
import { BASE_URL, NETWORK_TIMEOUT } from '../CONSTANT'
import axios from 'axios';
import { APP_CONFIG } from '@Utils/Realm/types';

// const controller = new AbortController();

// const CancelToken = axios.CancelToken;
// const cancelToken = CancelToken.source();

// // cancel the request (the message parameter is optional)
// cancelToken.cancel('Operation canceled by the user.');
// // OR
// controller.abort(); // the message parameter is not supported

const myAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: NETWORK_TIMEOUT,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        // "Access-Control-Allow-Origin": true
    },
    timeoutErrorMessage: 'requestnya melewati batas ya...',
    // cancelToken: cancelToken.token,
    // signal: controller.signal,
    validateStatus: status => status >= 200 && status < 500
    // onDownloadProgress: (progressEvent) => { log('onDownloadProgress : ', progressEvent)},
    // onUploadProgress: (progressEvent) => {log('onUploadProgress : ', progressEvent)},
});

const POST = async (url = '', payload = {}) => {
    // log(`POST TO ${BASE_URL}${url}`)
    try {
        let { data, status } = await myAxiosInstance.post(url, payload);
        if (url == 'auth/refresh' && status == 400) return Promise.resolve(null)

        switch (status) {
            case 200:
            case 400:
            case 401:
            case 403:
                return Promise.resolve(data)
            default: throw (status)
        }
    } catch (err) {
        log('ERROR POST CATCH :', err)
        return Promise.reject(err)
    }
};

const GET = async (url = '') => {
    if (url == '') return Promise.reject()
    // log(`GET TO ${BASE_URL}${url}`)
    try {
        let Authorization = '';
        let appConfig = await MyRealm.selectData(APP_CONFIG, ([dbres]) => ({ ...dbres, value: JSON.parse(dbres.value) }));
        Authorization = `Bearer ${appConfig?.value?.token?.access_token || ''}`;
        let { data, status } = await myAxiosInstance.get(url, { headers: { Authorization, } });
        switch (status) {
            case 200:
                // log(url, 'token masih aktif kok... ada', data.length)
                return Promise.resolve(data);
            case 400:
            case 401:
            case 403:
                global.showToast('minta token baru dulu ya...')
                // log('minta token baru dulu ya...')
                await REFRESH_TOKEN(appConfig);
                return GET(url)
            default: throw (status)
        }

    } catch (err) {
        log('ERROR GET', url, ' ', err)
        return Promise.reject(err)
    }
};

const REFRESH_TOKEN = async appConfig => {
    try {
        let { data: { token: { access_token } } } = await myAxiosInstance.post('auth/refresh', appConfig.value.token);
        appConfig = {
            ...appConfig,
            value: {
                ...appConfig.value,
                token: {
                    ...appConfig.value.token,
                    access_token,
                }
            }
        }
        await MyRealm.updateData(APP_CONFIG, { id: appConfig.configId, value: JSON.stringify(appConfig.value) })
        return true;
    } catch (err) {
        log('ERROR POST CATCH REFRESH_TOKEN :', err)
        return false
    }
}

export { POST, GET };