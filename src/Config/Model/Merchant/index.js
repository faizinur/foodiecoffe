import { log, GET, MyRealm } from '@Utils';
import { PRODUCT } from '@Utils/Realm/types';

const getMerchantCategory = async merchantId => {
    try {
        let loginData = await GET(`${merchantId}/category/all`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: loginData,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
};

const getCategoryList = async () => {
    try {
        let data = await MyRealm.selectData(PRODUCT)
        return data.length > 0 ? data : [];
    } catch (err) {
        log('getCategoryList ', err)
        return err;
    }
};

export {
    getMerchantCategory,
    getCategoryList,
}