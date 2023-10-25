var _const = (() => {
    let __scope__ = {};
    return function(key, value) {
        if (!value) {
            throw new Error("声明常量必须赋值");
        }
        Object.defineProperty(__scope__, key, {
            configurable: true,
            enumerable: false,
            get: () => {
                return value
            },
            set: (newValue) => {
                value = newValue
            }
        })
        return __scope__;
    }
})()

// _const('js')
