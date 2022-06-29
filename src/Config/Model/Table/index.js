import { log, GET } from '@Utils';

const getTables = async merchantId => {
    try {
        let tables = await GET(`${merchantId}/table/all`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: tables,
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
    getTables
}