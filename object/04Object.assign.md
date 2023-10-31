# 04实现Object.assign

# 一、`Object.assign`基本使用

## 1.多个源对象复制到目标对象

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象`source`复制到目标对象。它将返回目标对象`target`。

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

target // { a: 1, b: 4, c: 5 }
returnedTarget // { a: 1, b: 4, c: 5 }
target === returnedTarget // true
```

`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。

## 2.同名覆盖

***注意**：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。*

```js
const target = { a: 1, b: 1 }

const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
target // {a:1, b:2, c:3}
```

## 3.仅一个参数

如果只有一个参数，`Object.assign`会直接返回该参数。

```js
const obj = {a: 1}

Object.assign(obj) // {a: 1}
Object.assign(obj) === obj // true
```

## 4.首参类型

如果该参数不是对象，则会先转成对象，然后返回。

```js
typeof Object.assign(2) // "object" ,变成包装类返回
```

由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错。

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果`undefined`和`null`不在首参数，就不会报错。

```js
let obj = {a: 1}
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```
const v1 = 'abc'
const v2 = true
const v3 = 10

const obj = Object.assign({}, v1, v2, v3)
obj // { "0": "a", "1": "b", "2": "c" }
```

上面代码中，`v1`、`v2`、`v3`分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

```
Object.assign(true) // {[[PrimitiveValue]]: true}
Object.assign(10)  //  {[[PrimitiveValue]]: 10}
Object.assign('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
```

上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性 `[[PrimitiveValue]]`上面，这个属性是不会被`Object.assign`拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

## 5.拷贝限制

`Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。

```js
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
```

上面代码中，`Object.assign`要拷贝的对象只有一个不可枚举属性`invisible`，这个属性并没有被拷贝进去。

属性名为 `Symbol` 值的属性，也会被`Object.assign`拷贝。

```
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
```

# 二、注意点

## 1.浅拷贝

`Object.assign`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```js
const obj1 = {a: {b: 1}}
const obj2 = Object.assign({}, obj1)

obj1.a.b = 2
obj2.a.b // 2
```

## 2.同名属性覆盖

```js
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```

数组的处理 `Object.assign`可以用来处理数组，但是会把数组视为对象。

```
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
// 索引为0,1的被替换了
```

## 3.get函数的处理

`Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```
const source = {
  get foo() { return 1 }
}
const target = {}

Object.assign(target, source)
// { foo: 1 }
```

# 三、用法

## 1.为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y})
  }
}
```

上面方法通过`Object.assign`方法，将`x`属性和`y`属性添加到`Point`类的对象实例。

## 2.为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
})

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
}
SomeClass.prototype.anotherMethod = function () {
  ···
}
```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用`assign`方法添加到`SomeClass.prototype`之中。

## 3.克隆对象

```js
function clone(origin) {
  return Object.assign({}, origin)
}
```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin)
  return Object.assign(Object.create(originProto), origin)
}
```

## 4.合并多个对象

将多个对象合并到某个对象。

```js
const merge = (target, ...sources) => Object.assign(target, ...sources)
```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

```js
const merge = (...sources) => Object.assign({}, ...sources)
```

## 5.为属性指定默认值

```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
}

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options)
  console.log(options)
  // ...
}
```

上面代码中，`DEFAULTS`对象是默认值，`options`对象是用户提供的参数。`Object.assign`方法将`DEFAULTS`和`options`合并成一个新对象，如果两者有同名属性，则`option`的属性值会覆盖`DEFAULTS`的属性值。

***注意**：由于存在浅拷贝的问题，`DEFAULTS`对象和`options`对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，`DEFAULTS`对象的该属性很可能不起作用。*

```js
const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
}

processContent({ url: {port: 8000} })
// {
//   url: {port: 8000}
// }

```

上面代码的原意是将 `url.port`改成 `8000`，`url.host`不变。实际结果却是`options.url`覆盖掉`DEFAULTS.url`，所以`url.host`就不存在了。

# 四、实现Object.assign

实现一个 `Object.assign` 大致思路如下：

1、判断原生 `Object` 是否支持该函数，如果不存在的话创建一个函数 `assign`，并使用 `Object.defineProperty` 将该函数绑定到 `Object` 上。

2、判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去,但必须设置值）。

3、使用 `Object()` 转成对象，并保存为 to，最后返回这个对象 to。

4、使用 `for..in` 循环遍历出所有可枚举的自有属性。并复制给新的目标对象（使用 `hasOwnProperty` 获取自有属性，即非原型链上的属性）。

实现代码如下，这里为了验证方便，使用 `assign2` 代替 `assign`。注意此模拟实现不支持 `symbol` 属性，因为`ES5` 中根本没有 `symbol` 。

