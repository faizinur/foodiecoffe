import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;
import dbOptions from './dbOptions';

const _newBSON = () => new UUID().toHexString();

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

const deleteData = (key, id = null) => new Promise(async (resolve, reject) => {
    if (key == '') return reject('key kosong')
    try {
        const realm = await Realm.open(dbOptions);
        realm.write(() => {
            let foundPayload = id == null ? realm.objects(key) : realm.objects(key).filtered("id = '" + id + "'");
            realm.delete(foundPayload)
            foundPayload = null;
        });
        resolve('OK');
    } catch (e) {
        log('deleteData : ', e)
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
                if ('id' in payload) {
                    //check if exist delete!
                    let foundPayload = realm.objects(key).filtered("id = '" + payload.id + "'");
                    if (foundPayload.length > 0) realm.delete(foundPayload)
                    foundPayload = null;
                    realm.create(key, payload)
                } else {
                    log('gak punya id nih! ', payload)
                }
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
    selectData,
    deleteData,
    insertData,
    updateData,
}