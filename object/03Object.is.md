# 03实现Object.is

# 一、基本语法

> `Object.is()` 方法判断两个值是否为同一个值

语法

```js
// 返回一个 Boolean 类型的值，相等为true，否则为false
Object.is(val1, val2);
```

- val1和val2分别为被比较的两个值

**存在的意义**

在`Object.is`之前，JS中判断两个数据是否相等都是通过非严格相等`==`和严格相等`===`进行判断

机制的不同导致其使用的场景也存在一些差异

非严格相等：若是需要进行隐式类型转换的相等比较，使用需谨慎，隐式转换会导致难以排查的问题

严格相等：不进行类型转换，类型不同总是返回**false**，类型和值都相等时，且类型不为`Number`类型，则返回**true**,其存在一些缺陷：`+0 === -0`返回**true**，`NaN === NaN`返回**false**

Object.is：在严格相等的基础之上，增加了正负零和`NaN`的判断，`+0 === -0`返回**false**，`NaN === NaN`返回**true**

# 二、规则

参数都是`undefined`、`null`、`true`、`false`时

```js
Object.is(undefined, undefined); // true
```

同一个引用地址的对象

```js
const o1 = {};
const o2 = o1;
const bol = Object.is(o1, o2); // true
```

number类型处理

```js
Object.is(+0, -0); // false
Object.is(0, -0); // false
Object.is(+0, 0); // true
Object.is(NaN, NaN); // true
```

# 三、实现

```js
+0 !== 0 // false
-0 !== 0 // false
+0 === -0
1 / +0 	// Infinity
1 / -1  // -Infinity
NaN !== NaN
Infinity === -Infinity // false
```

```js
const is = (val1, val2) => {
    if (val1 === val2) {
    // 处理 +0 === -0， 只要x !== 0, 恒为true， x = 0, Infinity来判断+0，-0,0
        return x !== 0 || 1 / x === 1 / y; （非0在全等下全是true，等于0判断+0，-0）
    }else {
        // 处理NaN，利用NaN !== NaN 的特型，只要不是NaN都是判断都是不相等的
        return x !== x && y !== y（除了NaN在全等下是不相等的，其他全是不相等的）
    }
};
```

首先看一下对于`NaN`的处理，处理`NaN`的是建立在`val1 !== val2`的基础之上，若是传入的是两个不同的数据且存在不为`NaN`的数据时，那么`x !== x`恒等为`false`，那么`is`函数最终返回`false`，若是都为`NaN`时，在JS中有且仅有`NaN !== NaN`返回`true`

看一下对于`+0 === -0`的处理逻辑，由于在严格相等中`+0 === -0`返回的是true，因为进入`if`逻辑中包含前述情况，由于`Object.is`属于对严格相等的功能补全，进入此逻辑中的其他情况都会返回`true`，因此`return`逻辑主要是处理`+0、-0`

