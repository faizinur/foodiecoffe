import { log, GET } from '@Utils';

const getDaftarTransaksi = async () => {
    try {
        let transaksiData = await GET('order/all')
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: transaksiData,
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