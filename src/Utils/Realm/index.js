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
                log(payload.value)
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
                // selectedData = realm.objects(key)
                selectedData = JSON.parse(JSON.stringify(realm.objects(key)));
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
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                let foundData = realm.objects(key)
                realm.delete(foundData)
                foundData = null;
            })
            //realm.close();
            resolve('OK');
        } catch (e) {
            reject(e);
        }
    })
}


const insertProduct = products => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                products.map(product => {
                    let foundProduct = realm.objects(PRODUCT).filtered(`id = '${product.id}'`)
                    if (foundProduct.length > 0) realm.delete(foundProduct)
                    foundProduct = null;
                    realm.create(PRODUCT, {
                        productId: new UUID().toHexString(),
                        ...product,
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
const updateData = (key, updatedValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            let foundData = await realm.objectForPrimaryKey(key, updatedValue.id);
            let iteratedValue = { ...updatedValue };
            delete iteratedValue['id'];

            if (typeof (foundData) !== 'undefined') {
                Object.keys(iteratedValue).map(key => {
                    log('update : ', key, iteratedValue[key])
                    foundData[key] = updatedValue[key]
                })
                resolve(foundData);
            } else {
                reject(`Primary key ${updatedValue.productId} Not Found`);
            }
        } catch (e) {
            reject(e)
        }
    })
}

const closeConnection = async () => {
    try {
        log('close realm')
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
    updateData,
}