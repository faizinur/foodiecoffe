import {
    IC_HOME,
    IC_HOME_FILL,
    IC_TRANSAKSI,
    IC_TRANSAKSI_FILL,
    IC_MENU,
    IC_MENU_FILL,
    IC_MEJA,
    IC_MEJA_FILL,
    IC_AKUN,
    IC_AKUN_FILL,
} from '@Atoms/Icons';
// const SPRING_CONFIG = {
//     damping: 80, //15
//     overshootClamping: true, //false
//     restDisplacementThreshold: 0.1, ///0.001
//     restSpeedThreshold: 0.1, //0.001
//     stiffness: 800, //120
// }
const BASE_URL = 'http://beta-api.foodie.coffee/';
const CONNECT_RETRIES = 15000;
const NETWORK_TIMEOUT = 30000;
const SPRING_CONFIG = {
    damping: 15,
    overshootClamping: false,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
    stiffness: 120
}
const ZOOM_IN = {
    0: {
        opacity: 0,
        scale: 0.8,
    },
    1: {
        opacity: 1,
        scale: 1,
    },
}

const NAVBAR_MENU = [
    {
        icon: IC_HOME,
        iconActive: IC_HOME_FILL,
        title: 'Home',
    },
    {
        icon: IC_TRANSAKSI,
        iconActive: IC_TRANSAKSI_FILL,
        title: 'Transaksi',
    },
    {
        icon: IC_MENU,
        iconActive: IC_MENU_FILL,
        title: 'Menu',
    },
    {
        icon: IC_MEJA,
        iconActive: IC_MEJA_FILL,
        title: 'Meja',
    },
    {
        icon: IC_AKUN,
        iconActive: IC_AKUN_FILL,
        title: 'Akun',
    },
]
export {
    SPRING_CONFIG,
    ZOOM_IN,
    BASE_URL,
    NETWORK_TIMEOUT,
    CONNECT_RETRIES,
    NAVBAR_MENU,
}