import { log, POST } from '@Utils';

const getTables = async merchantId => {
    try {
        let tables = await POST(`${merchantId}/table/all`)
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