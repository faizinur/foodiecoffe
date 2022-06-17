import { log, GET } from '@Utils';

const getTables = async (merchantId = 'B1778H') => {
    try {
        let tables = await GET(`${merchantId}/table/all`)
        __DEV__ && (tables[1].occupied = false);
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: tables.sort(prev => prev.occupied == true),
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL TABLE ${e}`,
            data: null,
        }
    }
};

const getQR = async (merchantId = 'B1778H', qrName) => {
    try {
        let qrImage = await GET(`${merchantId}/qr/${qrName}`, {})
        // log('INI QR IMAGE ', typeof qrImage)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: qrImage,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL TABLE ${e}`,
            data: null,
        }
    }
};


export {
    getTables,
    getQR,
}