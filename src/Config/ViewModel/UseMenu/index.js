import { Menu } from '@Model';
import { useState, useCallback } from 'react';
import { log } from '@Utils';
export default () => {
    const { getMenu } = Menu;
    const [menuList, setMenuList] = useState([])
    const [menuError, setMenuError] = useState('');
    const [menuLoading, setMenuLoading] = useState(false);

    const _getMenu = useCallback(async (merchantId, menuId) => {
        try {
            setLoading(true)
            setMerchantError('')
            const { status, data, message } = await getMenu(merchantId, menuId);
            if (status != 'SUCCESS') throw message;
            setMerchantList(data)
            setLoading(false)
        } catch (err) {
            setMerchantError(`error Merchant ${err}`)
            setLoading(false)
        }
    }, [])

    return {
        _getMenu,
        menuList,
        menuError,
        menuLoading,
    }
}

