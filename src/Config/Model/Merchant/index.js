import { log, POST } from '@Utils';

const getMerchantCategory = async merchantId => {
    try {
        let loginData = await POST(`${merchantId}/category/all`)
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
    getMerchantCategory,
}