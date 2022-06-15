import { log, GET } from '@Utils';

const getMenu = async (merchantId, menuId) => {
    try {
        let loginData = await GET(`${merchantId}/menu/get/${menuId}`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: loginData,
        }
    } catch (e) {
        return {
            status: "FAILED",
            message: `MODEL AUTH ${e}`,
            data: null,
        }
    }
};

export {
    getMenu
}