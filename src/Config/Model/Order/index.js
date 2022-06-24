import { log, GET, LONG_POLL } from '@Utils';

const getOrders = async () => {
    try {
        let orderData = await GET('order/all')
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: orderData,
        }
    } catch (e) {
        log(e)
        return {
            status: "FAILED",
            message: `MODEL ORDER ${e}`,
            data: null,
        }
    }
};

export {
    getOrders,
}