# 实现Object.freeze、Object.seal

[JavaScript 中对象处理之 Object.freeze 与 Object.seal](https://juejin.cn/post/7029320292581244935?searchId=2023102820001928C841B3C118779B3805)

# 一、Object.freeze特性

`Object.freeze`方法可以冻结一个对象，一个冻结后的对象再也不能被修改。首先介绍一下基本用法：

## 语法

> Object.freeze(obj)

### 参数

obj：要被冻结的对象

### 返回值

被冻结的对象

```js
let obj={
  a:1,
  b:2
}
let newObj = Object.freeze(obj);
console.log(newObj === obj) // true
```

也就是说返回的对象跟源对象是同一个引用，并且对象被冻结后是只读的：

```js
let obj={
    a:1,
    b:2
  }
Object.freeze(obj);
console.log(obj.a) // 1
```

我们可以用`Object.isFrozen`方法来检测一个对象是否是被冻结过的对象

```js
let obj={
    a:1,
    b:2
  }
Object.freeze(obj);
console.log(Object.isFrozen(obj)) // true
```

被冻结对象自身的所有属性都不能以任何方式被修改。任何修改尝试都会失败，包括添加、修改、删除：

```js
let obj={
  a:1,
  b:2
}
Object.freeze(obj);
obj.c=3;
console.log(obj)  // {a:1,b:2} 冻结了一个对象则不能向这个对象添加新的属性

obj.a=11;
console.log(obj) // {a:1,b:2} 冻结了一个对象则不能修改这个对象中的属性

delete obj.a
console.log(obj) // {a:1,b:2} 冻结了一个对象则不能删除已有属性
```

以上在非严格模式下都不会有报错，但当我们处于严格模式下时：

```js
"use strict";
 let obj = {
  a: 1,
  b: 2,
};
Object.freeze(obj);
obj.a = 11;
console.log(obj); // TypeError: Cannot assign to read only property 'a' of object 提示该属性是只读的

obj.c=3;
console.log(obj) // TypeError: Cannot add property c, object is not extensible 提示该对象是不可扩展的 
```

## 修改原型

注意对象一旦被冻结之后该对象的原型也不可以被修改：

```js
function Test() {
  this.a = 1;
  this.b = 2;
}
Test.prototype.c=3
let obj = new Test();
Object.freeze(obj);
obj.__proto__={aaa:111}
console.log(obj) // Error: #<Test> is not extensible 是不可扩展的
```

但是原型中的属性却可以被修改，这是因为`Object.freeze`方法是浅冻结，也就是说只会冻结一层:

```js
    function Test() {
      this.a = 1;
      this.b = 2;
    }
    Test.prototype.c=3
    let obj = new Test();
    Object.freeze(obj);
    obj.__proto__.c=4
    console.log(obj.c) // 4 
    
    // 原型也是一个对象，根据以下结构可以看出，原型里又是一个对象，所以原型对象里的属性是冻结不了的
    // obj:{
    //   a:1,
    //   b:2,
    //   原型:{
    //     c:3
    //   }
    // }

```

不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。

```js
let obj={
    a:1,
    b:2
}
Object.defineProperty(obj,"a",{
    value:1,
    //enumerable:false
    //configurable:false,
    //writable:false
})
console.log(obj) //  Cannot redefine property: a at Function.defineProperty
```

通过对象的`get`和`set`方法也不能修改冻结后的对象

```js
let obj = {
  a: 1,
  b: 2,
  get() {
    return this.a;
  },
  set(newVal) {
    this.a = newVal;
  },
};
Object.freeze(obj);
obj.a = 11;
console.log(obj); // {a:1,b:2}
```

在 ES5 中，如果这个方法的参数不是一个对象（一个原始值），那么它会导致 `TypeError`。在 ES6 中，非对象参数将被视为要被冻结的普通对象，并被简单地返回。

```js
// ES6
let res=Object.freeze(123); // true
console.log(res); // 123  // true


// ES5
let res=Object.freeze(123);
console.log(res) // TypeError: 123 is not an object

```

也可以传入数组参数

```js
let arr=[1,2,3];
Object.freeze(arr);
arr.push(4)
console.log(arr) // Cannot add property 3, object is not extensible

// 上述报错是因为数组也是一个特殊的对象，可以转换为以下结构，故也不能被新增、修改、删除
// arr={
//    "0":1,
//    "1":2,
//    "2":3,
//    "3":4
//}
```

# 二、Object.Seal

在 JavaScript 中，`Object.seal` 也和 `密封` 做同样的事情。`Object.seal` 使传递给它的对象的所有属性都不可配置，可用于阻止向对象添加新的属性和删除属性，但允许更改和更新现有属性。，来看下面的例子：

```js
const obj = { author: "DevPoint" };
console.log(Object.getOwnPropertyDescriptors(obj));
/*
{
    author: {
      value: 'DevPoint',
      writable: true,
      enumerable: true,
      configurable: true
    }
}
*/
Object.seal(obj);
console.log(Object.getOwnPropertyDescriptors(obj));
/*
{
    author: {
      value: 'DevPoint',
      writable: true,
      enumerable: true,
      configurable: false
    }
}
*/
obj.author = "zhuling";
console.log(obj.author); // zhuling
delete obj.author;
console.log(obj.author); // zhuling
obj.city = "Shenzhen";
console.log(obj.city); // undefined
```

上面代码定义了一个对象 `obj` 有一个属性 `author` ，其中的值为 `DevPoint`，初始的描述属性如下：

```yaml
{
    author: {
      value: 'DevPoint',
      writable: true,
      enumerable: true,
      configurable: true
    }
}
```

然后用 `Object.seal` 密封了对象，再次查看哪些描述符发生了变化，哪些没有，从结果看只有可配置的更改为 `false`。

```
{
    author: {
      value: 'DevPoint',
      writable: true,
      enumerable: true,
      configurable: false
    }
}
```

```
obj.author = "zhuling";
```

尽管 `Object.seal` 后的可配置现在为 `false`，但还是通过代码改变其属性值为 `zhuling` ，正如之前所解释的，将可配置设置为 `false` 会使属性不可写，但是如果 `writable` 明确为 `true` ，则它不起作用。当创建一个对象并设置一个新属性时，它默认为 `writable:true` 。

```
delete obj.author;
```

`Object.seal` 会使每个属性都不可配置，从而防止被删除。从上面的代码看，对对象执行 `Object.seal` 后，`delete obj.author;` 将变得无效。

```
obj.city = "Shenzhen";
```

当 `Object.seal` 或 `Object.freeze` 被调用时，执行后的对象将变成不可扩展的对象，这意味着不能从中删除任何属性，也不能向其中添加任何属性。

# 三、实现freeze、seal同理

freeze是将writable， configurable变为false，seal将configurable，变为false，都是用defineProperty来修改

```js
function myFreeze(obj) {
  if (obj instanceof Object) {
    Object.seal(obj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false,
        });
      }
      myFreeze(obj[key]);
    }
  }
}
const obj1 = {
  a: 100,
};

myFreeze(obj1);

obj1.a = 10000;

delete obj1.a;
console.log("✅ ~ obj1.a:", obj1.a);
```

