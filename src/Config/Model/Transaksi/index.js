import { log, GET } from '@Utils';

const getDaftarTransaksi = async () => {
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
            message: `MODEL DAFTAR TRANSAKSI ${e}`,
            data: null,
        }
    }
};

export {
    getDaftarTransaksi
}