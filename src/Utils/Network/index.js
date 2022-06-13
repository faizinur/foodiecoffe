import axios from 'axios';

const baseURL = 'http://beta-api.foodie.coffee/';
const _transformRequest = (data) => {
    return JSON.stringify(params);
};
const POST = async (...params) => {
    let [url, data] = params;
    return new Promise((resolve, reject) => {
        fetch(baseURL + url, {
            method: 'POST',
            body: _transformRequest(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(JSON.parse(responseJson));
            })
            .catch(err => {
                log(url, `error ${err}`);
                reject(err);
            });
    })
};
export { POST };
