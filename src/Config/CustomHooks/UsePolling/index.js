import { useRef } from 'react'
import { log, CONSTANT } from '@Utils'
export default (fn = null, delay = CONSTANT.CONNECT_RETRIES) => {
    const timeoutRef = useRef(null);
    const savedFn = useRef(fn);

    const startPolling = async () => {
        if (fn == null) {
            log('fungsi gak ada');
            return false;
        }
        await savedFn.current();
        await new Promise(resolve => {
            timeoutRef.current = setTimeout(() => {
                stopPolling();
                resolve();
            }, delay);
        })
        await startPolling();
    }
    const stopPolling = async () => {
        log(`timeout id ${timeoutRef.current} cleared`)
        clearTimeout(timeoutRef.current);
    }
    return [startPolling, stopPolling];
};