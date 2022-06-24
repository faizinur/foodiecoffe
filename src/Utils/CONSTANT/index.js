// const SPRING_CONFIG = {
//     damping: 80, //15
//     overshootClamping: true, //false
//     restDisplacementThreshold: 0.1, ///0.001
//     restSpeedThreshold: 0.1, //0.001
//     stiffness: 800, //120
// }
const BASE_URL = 'http://beta-api.foodie.coffee/';
const CONNECT_RETRIES = 15000;
const NETWORK_TIMEOUT = 15000;
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
export {
    SPRING_CONFIG,
    ZOOM_IN,
    BASE_URL,
    NETWORK_TIMEOUT,
    CONNECT_RETRIES,
}