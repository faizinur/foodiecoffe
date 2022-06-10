import { RiwayatTransaksi } from '@Model';
const { getRiwayatTransaksi } = RiwayatTransaksi;
import { useState } from 'react'
const useRiwayatTransaksi = () => {
    const [error, setError] = useState(null);
    const [paidOrder, setPaidOrder] = useState([]);
    const [canceledOrder, setCanceledOrder] = useState([]);

    const _getRiwayatTransaksi = async () => {
        try {
            let order = await getRiwayatTransaksi();
            setPaidOrder(order.filter(({ orderStatus }) => orderStatus == 'paid'));
            setCanceledOrder(order.filter(({ orderStatus }) => orderStatus == 'canceled'));
        } catch (e) {
            setError(e)
        }
    }

    return [
        paidOrder,
        canceledOrder,
        _getRiwayatTransaksi,
        error,
    ]
}

export {
    useRiwayatTransaksi
}

