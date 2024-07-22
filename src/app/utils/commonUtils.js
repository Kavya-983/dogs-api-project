export const debounce = (callbackFunc, timeout) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callbackFunc.apply(this, args)
        }, timeout)
    }
}
