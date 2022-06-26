import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;
import dbOptions from './dbOptions';
import {
    APP_CONFIG,
    PRODUCT,
} from './types';

const insertData = payload => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                let appConfigCount = realm.objects(APP_CONFIG).filtered(`key == "${payload.key}"`);
                if (appConfigCount.length > 0) {
                    realm.delete(appConfigCount);
                    appConfigCount = null;
                } else {
                    realm.create(APP_CONFIG, { ...payload, configId: new UUID().toHexString() });
                }
            });
            //realm.close();
            resolve(true)
        } catch (e) {
            log('reject insertdata ', e)
            reject(e)
        }
    })
}

const selectData = async (key) => {
    if (key == '') return Promise.reject('key kosong')
    return new Promise(async (resolve, reject) => {
        try {
            let selectedData = '';
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                selectedData = realm.objects(key)
                // selectedData = JSON.parse(JSON.stringify(realm.objects(key)));
            });
            //realm.close();
            resolve(selectedData);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteData = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let selectedData = '';
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                selectedData = realm.objects(APP_CONFIG).filtered(`key == '${key}'`);
                realm.delete(selectedData);
                selectedData = null;
            })
            //realm.close();
            resolve(selectedData);
        } catch (e) {
            reject(e);
        }
    })
}


const insertProduct = payloads => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                payloads.map(payload => {
                    realm.create(PRODUCT, {
                        productId: new UUID().toHexString(),
                        ...payload,
                    })
                })
            });
            //realm.close();
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

const closeConnection = async () => {
    try {
        log('close realm')
        // await Realm.close()
    } catch (e) {
        log('closeConnection ERR : ', e)
    }
}
export {
    insertData,
    selectData,
    deleteData,
    closeConnection,
    insertProduct,
}