# 08实现Promises/A+ 

# 一、实现状态切换

## 1.定义基本结构

- 定义状态
- 定义执行结果
- 定义执行函数（this丢失问题），创建完成后调用`resolve，reject`，this丢失

```js
class myPromise {
  // 1.定义状态
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  // 3.Promsie必须传入一个可执行函数参数
  // 并且当我们传入这个函数参数的时候，这个函数参数会自动执行。
  constructor(func) {
    // 1.定义promsie的初始状态
    this.PromiseState = myPromise.PENDING;
    // 2.定义promise结果
    this.PromiseResult = null;
    // 2.这个函数需要传入改变状态的参数，也是函数
    // 3.this.丢失问题处理bind(this)
    func(this.resolve.bind(this), this.reject.bind(this));
  }
}
```

