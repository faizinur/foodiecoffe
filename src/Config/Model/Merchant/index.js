import { log, GET } from '@Utils';

const getMerchantCategory = async () => {
    try {
        let loginData = await GET('A1778G/category/all')
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

export {
    getMerchantCategory
}