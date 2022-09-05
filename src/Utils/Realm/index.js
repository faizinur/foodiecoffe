import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;
import dbOptions from './dbOptions';
import {
    APP_CONFIG,
    PRODUCT,
    ORDER
} from './types';

const _newBSON = () => new UUID().toHexString();

const insertConfig = payload => new Promise(async (resolve, reject) => {
    try {
        const realm = await Realm.open(dbOptions);
        realm.write(() => {
            log(payload.value)
            let appConfigCount = realm.objects(APP_CONFIG).filtered(`key == "${payload.key}"`);
            if (appConfigCount.length > 0) {
                realm.delete(appConfigCount);
                appConfigCount = null;
            } else {
                realm.create(APP_CONFIG, { ...payload, configId: _newBSON() });
            }
        });
        resolve(true)
    } catch (e) {
        log('reject insertConfig ', e)
        reject(e)
    }
})

const selectData = async (key, callback = null) => new Promise(async (resolve, reject) => {
    if (key == '') return reject('key kosong')
    try {
        let selectedData = '';
        const realm = await Realm.open(dbOptions);
        realm.write(() => {
            selectedData = JSON.parse(JSON.stringify(realm.objects(key)));
        });
        resolve(callback != null ? callback(selectedData) : selectedData);
    } catch (error) {
        reject(error);
    }
})

const deleteData = (key) => new Promise(async (resolve, reject) => {
    if (key == '') return reject('key kosong')
    try {
        const realm = await Realm.open(dbOptions);
        realm.write(() => {
            let foundData = realm.objects(key)
            realm.delete(foundData)
            foundData = null;
        })
        resolve('OK');
    } catch (e) {
        reject(e);
    }
})


const insertData = (key, data) => new Promise(async (resolve, reject) => {
    if (key == '') return reject('key kosong')
    try {
        const realm = await Realm.open(dbOptions);
        let payloads = (Array.isArray(data) ? [...data] : [data])
        realm.write(() => {
            Promise.all(payloads.map(payload => {
                // let foundPayload = realm.objects(key).filtered(`id = '${payload.id}'`)
                // if (foundPayload.length > 0) realm.delete(foundPayload)
                // foundPayload = null;
                payload.id = _newBSON()
                realm.create(key, payload)
            }))
        });
        resolve(payloads)
    } catch (e) {
        reject(e)
    }
})

const updateData = (key, updatedValue) => new Promise(async (resolve, reject) => {
    if (key == '') return reject('key kosong')
    if (updatedValue?.id == '') reject('primaryKey empty');
    Realm.open(dbOptions).then(realm => {
        realm.write(() => {
            let objData = realm.objectForPrimaryKey(key, updatedValue.id);
            delete updatedValue['id'];
            if (typeof (objData) !== 'undefined') {
                Object.keys(updatedValue).map(key => objData[key] = updatedValue[key])
                resolve('OK');
            } else {
                reject(`Primary key ${updatedValue.id} Not Found`);
            }
        });
    });
})

export {
    _newBSON,
    insertConfig,
    selectData,
    deleteData,
    insertData,
    updateData,
}