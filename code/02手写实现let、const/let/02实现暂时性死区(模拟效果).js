// 块级作用域：用立即执行函数模拟
// 只能说模拟一下这种效果
var _let = (() => {
    var __scope__ = {};
    return function (key, value) {
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
      return __scope__;
    }
  })()

{
    let key = 'js';
    (()=>{
        console.log("✅ ~ zhuling js:", obj ? obj[key] : undefined)
        var obj =  _let(key, "javascript");
        console.log("✅ ~ zhuling js222:", obj, obj['js'])
    })()
}

