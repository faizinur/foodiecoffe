import { log, GET } from '@Utils';

const getOrders = async () => {
    try {
        let loginData = await GET('order/all')
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
    getOrders
}