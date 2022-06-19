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

export {
    getTables
}