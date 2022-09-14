import { log, POST } from '@Utils';

const getDaftarTransaksi = async (page = null) => {
    try {
        let transaksiData = await POST(`transaction/all${page != null ? `?page=${page}&limit=5` : ``}`);
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