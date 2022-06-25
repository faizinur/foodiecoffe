import { log, GET } from '@Utils';

const getDaftarTransaksi = async () => {
    try {
        let transaksiData = await GET('transaction/all');
        return {
            status: transaksiData.status,
            message: transaksiData.message,
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