import { log, GET } from '@Utils';
const getListProduct = async merchantId => {
    try {
        let productData = await GET(`${merchantId}/menu/all`)
        return {
            status: 'SUCCESS',
            message: 'API SUCCESS!',
            data: productData,
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
    getListProduct
}