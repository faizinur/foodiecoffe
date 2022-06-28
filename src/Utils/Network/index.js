import React from 'react';
import { log, MyRealm } from '@Utils';
import { BASE_URL, NETWORK_TIMEOUT } from '../CONSTANT'
import axios from 'axios';
import { APP_CONFIG } from '@Utils/Realm/types';
import { reset } from '@RootNavigation';
const controller = new AbortController();

const CancelToken = axios.CancelToken;
const cancelToken = CancelToken.source();

// // cancel the request (the message parameter is optional)
// cancelToken.cancel('Operation canceled by the user.');
// // OR
// controller.abort(); // the message parameter is not supported

const myAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: NETWORK_TIMEOUT,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        "Access-Control-Allow-Origin": true
    },
    timeoutErrorMessage: 'requestnya melewati batas ya...',
    cancelToken: cancelToken.token,
    signal: controller.signal,
    validateStatus: status => status >= 200 && status < 500
    // transformRequest: [(data, headers) => {
    //     // Do whatever you want to transform the data
    //     log('select token before send', data)
    //     return data;
    // }],
    // transformResponse: [(data) => {
    //     // Do whatever you want to transform the data
    //     log('Rubah Struktur Data')
    //     return data;
    // }],
    // onDownloadProgress: (progressEvent) => { log('onDownloadProgress : ', progressEvent)},
    // onUploadProgress: (progressEvent) => {log('onUploadProgress : ', progressEvent)},
});

const POST = async (url = '', data = {}) => {
    log(`POST TO ${BASE_URL}${url}`)
    if (url == '' || (url == '' && data == {})) return Promise.reject()
    try {
        return new Promise((resolve, reject) => {
            myAxiosInstance.post(url, data)
                .then(({ data, status, statusText, headers, config }) => {
                    switch (status) {
                        case 200:
                        case 400:
                        case 403:
                            resolve(data)
                            break;
                        default: throw (status)
                    }
                }).catch(err => {
                    log(`ERROR POST : ${url} ${err}`)
                    reject(err)
                })
        })
    } catch (err) {
        log('ERROR POST', err)
        return Promise.reject(err)
    }
};

const GET = async (url = '', data = {}) => {
    log(`GET TO ${BASE_URL}${url}`)
    if (url == '' || (url == '' && data == {})) return Promise.reject()
    try {
        let Authorization = '';
        let select = await MyRealm.selectData(APP_CONFIG);
        if (select.length > 0) {
            Authorization = `Bearer ${JSON.parse(select[0]?.value)?.token?.access_token}`;
        }
        return new Promise((resolve, reject) => {
            myAxiosInstance.get(url, {
                headers: { Authorization, }
            }).then(({ data, status, statusText, headers, config }) => {
                switch (status) {
                    case 200:
                    case 400:
                    case 401:
                    case 403:
                        resolve(data)
                        break;
                    default: throw (status)
                }
            }).catch(err => {
                log(`ERROR GET ${url} ${err}`)
                reject(err)
            })
        })
    } catch (err) {
        log('ERROR GET')
        return Promise.reject(err)
    }
};

export { POST, GET, cancelToken, controller };