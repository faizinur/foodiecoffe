import React from 'react';
import { log, MyRealm } from '@Utils';
import {BASE_URL} from '../CONSTANT'
import axios from 'axios';

const controller = new AbortController();

const CancelToken = axios.CancelToken;
const cancelToken = CancelToken.source();

// // cancel the request (the message parameter is optional)
// cancelToken.cancel('Operation canceled by the user.');
// // OR
// controller.abort(); // the message parameter is not supported

const myAxiosInstance = axios.create({
    baseURL : BASE_URL,
    timeout: 3000,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        "Access-Control-Allow-Origin": true
    },
    timeoutErrorMessage: 'requestnya melewati batas ya...',
    cancelToken: cancelToken.token,
    signal: controller.signal,
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
    return new Promise((resolve, reject) => {
        // const myForms = new FormData();
        // myForms.append('adsad', 0);

        myAxiosInstance.post(url, data)
            .then(({ data, status, statusText, headers, config }) => {
                if ([200, 202].includes(status)) {
                    resolve(data)
                } else {
                    reject({ status })
                }
            }).catch(err => {
                log(`ERROR POST ${url}`)
                reject(err)
            })
    })
};
const GET = async (url = '', data = {}) => {
    log(`GET TO ${BASE_URL}${url}`)
    if (url == '' || (url == '' && data == {})) return Promise.reject()

    let Authorization = '';
    let select = await MyRealm.selectData();
    if (select.length > 0) {
        Authorization = `Bearer ${JSON.parse(select[0]?.value)?.token?.access_token}`;
    }
    return new Promise((resolve, reject) => {
        myAxiosInstance.get(url, {
            headers: { Authorization, }
        }).then(({ data, status, statusText, headers, config }) => {
            if ([200, 202].includes(status)) {
                resolve(data)
            } else {
                reject({ status })
            }
        }).catch(err => {
            log(`ERROR GET ${url}`)
            reject(err)
        })
    })
};
const GET_PICTURE = async (url = '', data = {}, config = {}) => {
    log(`GET TO ${BASE_URL}${url}`)
    if (url == '' || (url == '' && data == {})) return Promise.reject('incomplete GET params')

    try {
        let Authorization = '';
        let select = await MyRealm.selectData();
        if (select.length > 0) {
            Authorization = `Bearer ${JSON.parse(select[0]?.value)?.token?.access_token}`;
        }
        return new Promise((resolve, reject) => {
            myAxiosInstance.get(url, {
                headers: {
                    Authorization,
                    ...config,
                }
            }).then(({ data, status, statusText, headers, config }) => {
                if ([200, 202].includes(status)) {
                    resolve(data)
                } else {
                    reject({ status })
                }
            }).catch(err => {
                log(`ERROR GET ${url}`)
                reject(err)
            })
        })
    } catch (err) {
        return Promise.reject(err)
    }
};


export { POST, GET, GET_PICTURE, cancelToken, controller };