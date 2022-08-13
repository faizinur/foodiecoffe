import { log, GET, POST } from '@Utils';
import moment from 'moment';

const getOrders = async (merchantId, page = null) => {
    try {
        let orderData = await POST(`${merchantId}/order/all` + `${page != null ? `?page=${page}&limit=5` : ''}`, {
            createdAt: {
                start: __DEV__ ? `2020-08-08 00:00:00` : `${moment().format('YYYY-MM-DD')} 00:00:00`,
                end: `${moment().format('YYYY-MM-DD hh:mm:ss')}`,
            }
        });
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