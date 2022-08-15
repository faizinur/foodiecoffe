import { log, POST } from '@Utils';

const getDaftarTransaksi = async () => {
    try {
        let transaksiData = await POST('transaction/all?page=1&limit=5');
        return {
            status: 'SUCCESS',
            message: 'SUCCESS',
            data: transaksiData,
        }
    } catch (e) {
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