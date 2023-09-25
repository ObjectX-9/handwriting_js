# 04instanceof

# 一、应用

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype

# 二、原理

原型链__proto__查找，目标类型的prototype和__proto__对比，为null不是目标类型，相等，则是目标类型

# 三、手写

```js
function myInstanceof(left, right) {
  // 1.无法判断基础类型，null直接为false
  if (typeof left !== "object" || left === null) return false;

  // 2.保存right的显式原型
  const prototype = right.prototype;
  left = left.__proto__;

  // 3.循环查找__proto__
  while (true) {
    // 没找到
    if (prototype === null) {
      return false;
    }
    // 找到了
    if (prototype === left) {
      return true;
    }
    // 原型链上查找
    left = left.__proto__;
  }
}
```

