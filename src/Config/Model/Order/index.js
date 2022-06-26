import { log, GET } from '@Utils';

const getOrders = async merchantId => {
    try {
        let orderData = await GET(`${merchantId}/order/all`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: orderData,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL ORDER ${JSON.stringify(e)}`,
            data: null,
        }
    }
};

export {
    getOrders,
}