import { log, GET } from '@Utils';

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

const getCategoryList = async merchantId => {
    try {
        log('AMBIL DARI REALM SCHEMA PRODUCT YA!')
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: Array(Math.round(Math.random() * 30)).fill().map((_, index) => index), // generate random array1*30
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
};

export {
    getMerchantCategory,
    getCategoryList,
}