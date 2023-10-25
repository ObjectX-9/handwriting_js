#  15手写实现let、const

# 一、let、const特性

## 1.let

- 具有块级作用域  ✅
- 具有暂时性死区  
- 没有变量提升      
- 不能重复声明      

## 2.const

+ 具有块级作用域

+ 具有暂时性死区

+ 没有变量提升

+ 不能重复声明

+ 声明常量必须赋值

+ 声明后非对象类型无法修改

# 二、作用域



# 三、暂时性死区

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。`var`变量提升将声明和初始化都提升了，但是let和const只提升了声明，未提升初始化，所以从进入作用域到变量初始化的这部分区域就被叫做暂时性死区

```
if (true) {
  // 暂时性死区开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // 暂时性死区结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

[暂时性死区let和const未提升初始化](https://juejin.cn/post/6844904073259384840)

[暂时性死区的理解](https://juejin.cn/post/6844903753015885831)

# 四、模拟作用域

首先我们知道 javascript 中声明的变量都是保存在作用域中，那么我们可以创建一个对象来模拟 javascript 中的作用域，把声明的变量看作是对象的属性

```
var __scope__ = {};
```

# 五、判断合法标识符

let 和 const 声明的标识符必须是一个合法的 javascript 标识符，由于对象的属性名都是字符串类型，因此所有的变量名都可以作为对象的属性名，当然我们也可以做一层校验，判断变量名中是否存在不合法的字符，最简单的方法就是使用正则判断

```
function isValidIdentifier(str) {
  // 使用正则表达式来匹配合法标识符
  const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

  return identifierRegex.test(str);
}
```

# 六、禁止重复声明&作用域提升

由于 javascript 中有预编译的概念，声明变量会被提升到作用域的顶层，而 let 和 const 声明的标识符不允许被重新声明，javascript 在预编译阶段就能检测出重复声明的标识符

我们利用一个数组先来保存所有声明的标识符，类似于预编译阶段的变量声明提升：

```js
var __scope__ = {};

var __variable__ = []; //等价于变量提升，只提升声明

for (var i = 0; i < __variable__.length; i++) {
  var property = __variable__[i];
  if (__scope__.hasOwnProperty(property)) {
    throw new SyntaxError(
      "Identifier " + property + " has already been declared"
    );
  }
}
```

然后利用对象的 hasOwnProperty 方法来检查__scope__是否拥有重复的属性，如果__variable__数组中有重复的 key 就会抛出一个重复声明的错误，如此我们就解决了变量重复声明的问题

# 七、暂时性死区

在 ES6 中，let 和 const 声明会被提升但未初始化，在变量声明之前引用块中的变量会导致错误，因为从块开始到处理声明为止，该变量都处于“临时死区”中

ok，我们接下来解决在声明之前访问变量的问题，这一步我们也可以在收集变量阶段一起处理，利用 ES5 的 Object.defineProperty API 对访问进行劫持：

属性被定义为不可枚举和可配置的主要目的是在初始化之前访问该属性时触发异常，以确保在使用变量之前必须进行初始化。这是因为在访问不可枚举的属性时，它们不会出现在对象属性的枚举中，而在访问可配置的属性时，它们可以被删除或修改。这两个特性结合在一起可以用来实现对未初始化变量的访问检查，下面解释这两个特性的作用：

1. 不可枚举（enumerable: false）：当属性被定义为不可枚举时，它不会出现在对象的属性枚举中，例如使用`for...in`循环或`Object.keys()`方法。这意味着代码不会无意中遍历到未初始化的变量，因为它们不会出现在枚举中。
2. 可配置（configurable: true）：可配置属性可以被删除，也可以修改其特性，例如可以将属性的`configurable`特性设置为`false`，使其不再可配置。这意味着在初始化之前，可以尝试删除或修改这个属性，但这种尝试会触发异常，因为属性的`get`方法定义了一个`ReferenceError`异常。

```js
var __scope__ = {};

var __variable__ = [];

for (var i = 0; i < __variable__.length; i++) {
  var property = __variable__[i];
  if (__scope__.hasOwnProperty(property)) {
    throw new SyntaxError(
      "Identifier " + property + " has already been declared"
    );
  } else {
    Object.defineProperty(__scope__, property, {
      configurable: true,
      enumerable: false,
      get() {
        throw new ReferenceError(
          "Cannot access " + property + " before initialization"
        );
      },
    });
  }
}

```

配置为enumerable， hasOwnProperty就获取不到这个属性

# 八、模拟块级作用域

let 和 const 声明的变量具有块级作用域的特点，这个不难实现，我们可以用一个闭包来解决：

```js
{
  let js = "jsvascript";
}

// 转义后

{
  (() => {
    __let__("js", "jsvascript");
  })();
}

```

# 九、模拟作用域链

在 Javacript 中存在作用域的概念，内层可以访问外层的作用域，全局作用域作为最顶层的作用域，可以被整个程序访问，这种结构和原型链的概念非常相似，因此我们可以利用原型链来实现这种效果：

```js
(function (__globalScope__) {
  var __scope__ = {};
  Object.setPrototypeOf(__scope__, __globalScope__);
})(__scope__);
```

在利用闭包隔绝作用域的时候，可以把外层的作用域传递进去当做内层作用域的原型，这样顺着原型链就能找到外层作用域上声明的变量了

# 十、实现let

## 1.模拟块级作用域

```js
// 块级作用域：用立即执行函数模拟
// 只能说模拟一下这种效果
var __scope__ = {};
function __let__(key, value) {
  return Object.defineProperty(__scope__, key, {
    configurable: true,
    enumerable: false,
    get: function () {
      return value;
    },
    set: function (newValue) {
      value = newValue;
    },
  });
}

{
  (() => {
    var obj =  __let__("js", "javascript");
    console.log("✅ ~ zhuling js:", obj, obj['js'])
    obj['js'] = 'hello'
    console.log("✅ ~ zhuling js:", obj, obj['js'])
  })();
}
// console.log("✅ ~ zhuling js2222:", js)
```

