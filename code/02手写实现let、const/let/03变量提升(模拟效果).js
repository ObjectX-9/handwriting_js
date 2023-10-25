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

function fn() {
    /* 这一步没什么用，只是想先拿到一个obj不然
    后续无法演示没有变量提升 */
    var obj = _let("b", 1);
    console.log("✅ ~ zhuling obj.b:", obj.b)
    /* 在输出a时，还没有定义a,但是js对于访问对象
    不存在的属性所做的处理是返回undefined，并不会报错 */
    console.log("✅ ~ zhuling obj.a:", obj.a)
    obj = _let("a", 1);
}

fn();
