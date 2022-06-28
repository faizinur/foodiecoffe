import { log, GET, MyRealm } from '@Utils';
import { PRODUCT } from '@Utils/Realm/types';

const getListProduct = async merchantId => {
    try {
        let productData = await GET(`${merchantId}/menu/all`)
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
        return {
            status: 'SUCCESS',
            message: 'UPDATE SUCCESS!',
            data: product,
        }
    } catch (error) {
        return {
            status: "FAILED",
            message: `MODEL PRODUCT ${e}`,
            data: null,
        }
    }
}

export {
    getProductList,
    getListProduct,
    setProductAvalability,
}