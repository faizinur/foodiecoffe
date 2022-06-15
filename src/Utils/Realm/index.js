import 'react-native-get-random-values';
import Realm from "realm";
import { log } from '@Utils'
const { UUID } = Realm.BSON;

const AppConfigSchema = {
    name: "APP_CONFIG",
    properties: {
        _id: "string?",
        key: "string?",
        value: "string?",
    },
    primaryKey: "_id",
};

const dbOptions = {
    path: "myrealm",
    schema: [AppConfigSchema],
}

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
            realm.close();
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
            selectedData = JSON.parse(JSON.stringify(realm.objects("APP_CONFIG")));
            realm.close();
            resolve(selectedData);
        } catch (error) {
            reject(e);
        }
    })
}
export {
    insertData,
    selectData,
}