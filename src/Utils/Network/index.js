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
        let appConfig = await MyRealm.selectData(APP_CONFIG);
        Authorization = `Bearer ${appConfig.length > 0 ? JSON.parse(appConfig[0]?.value)?.token?.access_token : ''}`;
        let { data, status } = await myAxiosInstance.get(url, { headers: { Authorization, } });
        switch (status) {
            case 200:
            case 400:
            case 401:
            case 403:
                return Promise.resolve(data)
            default: throw (status)
        }

    } catch (err) {
        log('ERROR GET')
        return Promise.reject(err)
    }
};

export { POST, GET };