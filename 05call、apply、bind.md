# 05call、apply、bind

# 一、call

## 1.应用

1. 判断数据类型：
2. 类数组借用数组的方法：
3. apply获取数组最大值最小值：
4. 继承

## 2.原理

### ①原生call具有哪些功能

1. 改变函数的执行上下文：使用 **`call`** 方法，可以将一个对象指定为函数的执行上下文。这意味着函数内部的 **`this`** 关键字将指向传递给 **`call`** 方法的第一个参数（即指定的对象）。
2. 传递参数：**`call`** 方法允许你在调用函数的同时传递参数。这些参数会作为 **`call`** 方法的后续参数传入，并在函数调用时被作为实参传递。

### ②手写思路

1. 判断context的类型
   1. null || undefined， 默认会被设置为window
2. *使用唯一属性保存函数this值，后面需要删除，不能对context造成影响*
3. *调用函数，并且将函数传递过去*
4. *删除增加的这个属性*
5. *返回结果*

```js
/* eslint-disable no-extend-native */
Function.prototype.myCall = function (context, ..._arg) {
  // 1.判断context的类型
  if (context === null || context === undefined) {
    context = window;
  } else {
    // 如果是原始类型则将他转换为包装类型
    context = Object(context);
  }

  // 2.使用唯一属性保存函数this值，后面需要删除，不能对context造成影响
  const uniquePrototype = Symbol("unique");
  context[uniquePrototype] = this;

  // 3.调用函数，并且将函数传递过去
  const result = context[uniquePrototype](..._arg);

  // 4.删除增加的这个属性
  delete context[uniquePrototype];

  // 5.返回结果
  return result;
};
```

# 二、apply

## 1.应用

1. 判断数据类型：
2. 类数组借用数组的方法：
3. apply获取数组最大值最小值：
4. 继承

## 2.原理

### ①原生apply有哪些功能

1. 改变函数的执行上下文：使用 **`apply`** 方法，可以将一个对象指定为函数的执行上下文。这意味着函数内部的 **`this`** 关键字将指向传递给 **`apply`** 方法的第一个参数（即指定的对象）。
2. 传递参数：**`apply`** 方法允许你在调用函数的同时以数组形式传递参数。这些参数会作为 **`apply`** 方法的第二个参数（以数组形式）传入，并在函数调用时被作为实参传递。
3. 可以传递类数组作为参数

### ②如何判断一个类数组

1. o不是null、undefined等
2. o是对象
3. o.length是有限数值
4. o.length为非负值
5. o.length是整数
6. o.length < 2^32 （超过，length不维护）





