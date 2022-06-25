import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;
import dbOptions from './dbOptions';
const insertData = payload => {
    return new Promise(async (resolve, reject) => {
        try {
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                let appConfigCount = realm.objects("APP_CONFIG").filtered(`key == "${payload.key}"`);
                if (appConfigCount.length > 0) {
                    realm.delete(appConfigCount);
                    appConfigCount = null;
                }
                realm.create("APP_CONFIG", { ...payload, _id: new UUID().toHexString() });
            });
            //realm.close();
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

const selectData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let selectedData = '';
            const realm = await Realm.open(dbOptions);
            realm.write(() => {
                selectedData = JSON.parse(JSON.stringify(realm.objects("APP_CONFIG")));
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
                selectedData = realm.objects("APP_CONFIG").filtered(`key == '${key}'`);
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
                    log(JSON.stringify(payload, null, 3))
                    realm.create('product', payload)
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