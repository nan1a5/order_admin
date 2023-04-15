// 防抖函数
export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

//节流函数
export const throttle = (fn, delay) => {
    let last = 0;
    return function () {
        let context = this;
        let args = arguments;
        let now = new Date();
        if (now - last > delay) {
            fn.apply(context, args);
            last = now;
        }
    }
}