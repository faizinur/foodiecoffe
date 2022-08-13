import { log, GET, POST, MyRealm } from '@Utils';
import { PRODUCT } from '@Utils/Realm/types';

const getListProduct = async merchantId => {
    try {
        let productData = await POST(`${merchantId}/menu/all`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: productData,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
};

const getProductList = async () => {
    try {
        let data = await MyRealm.selectData(PRODUCT)
        return data.length > 0 ? data : [];
    } catch (err) {
        log('getProductList ', err)
        return err;
    }
};

const setProductAvalability = async product => {
    try {
        await MyRealm.updateData(PRODUCT, product);
        let data = await MyRealm.selectData(PRODUCT)
        return data.length > 0 ? data : [];
    } catch (error) {
        log('setProductAvalability ', err)
        return err;
    }
}

export {
    getProductList,
    getListProduct,
    setProductAvalability,
}