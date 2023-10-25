var _const = (() => {
    let __scope__ = {};
    return function(key, value) {
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

{
    const jse = _const('js', '测试测试');
    console.log("✅ ~ zhuling jse111:", jse, jse['js'])
}
// console.log("✅ ~ zhuling jse222:", jse)
