// 块级作用域：用立即执行函数模拟
// 只能说模拟一下这种效果
const _let = (() => {
    var __scope__ = {};
    return function (key, value) {
      if (__scope__.hasOwnProperty(key)) {
        throw new Error("不能重复声明" + key);
      } else {
        Object.defineProperty(__scope__, key, {
            configurable: true,
            enumerable: false,
            get: function () {
              return value;
            },
            set: function (newValue) {
              value = newValue;
            },
          });
          __scope__[key] = value;
      }
      return __scope__;
    }
  })()
  
  {
    const jse = _let('js', '测试测试');
    console.log("✅ ~ zhuling jse:", jse, jse['js'])
    // _let('js', '测试测试')
  }
  // console.log("✅ ~ zhuling js2222:", jse['js'])
  