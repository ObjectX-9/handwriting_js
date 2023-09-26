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

```js
// JavaScript权威指南判断是否为类数组对象
function isArrayLike(o) {
  if (
    o && // o不是null、undefined等
    typeof o === "object" && // o是对象
    isFinite(o.length) && // o.length是有限数值
    o.length >= 0 && // o.length为非负值
    o.length === Math.floor(o.length) && // o.length是整数
    o.length < Math.pow(2, 32) //o.length < 2^32
	  )
    return true;
  else return false;
}
```

### ③手写思路

1. 判断context类型
2. 创建唯一属性保存函数
3. 获取第二参数根据参数类型处理
   1. 如果有参数
      1. 如果非数组、非类数组，报错
      2. 如果是数组或者类数组，将参数Array.from为数组，传递参数，执行函数
   2. 如果无参数直接执行函数
4. 删除属性
5. 返回结果

```js
// JavaScript权威指南判断是否为类数组对象
function isArrayLike(o) {
  if (
    o && // o不是null、undefined等
    typeof o === "object" && // o是对象
    isFinite(o.length) && // o.length是有限数值
    o.length >= 0 && // o.length为非负值
    o.length === Math.floor(o.length) && // o.length是整数
    o.length < 4294967296
  )
    // o.length < 2^32
    return true;
  else return false;
}

Function.prototype.myApplyLikeArray = function (context) {
  if (context === null || context === undefined) {
    context = window; // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
  } else {
    context = Object(context); // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }

  const specialPrototype = Symbol("特殊属性Symbol"); // 用于临时储存函数
  context[specialPrototype] = this; // 隐式绑定this指向到context上

  let args = arguments[1]; // 获取参数数组
  console.log("args", args);
  let result;

  // 处理传进来的第二个参数
  if (args) {
    // 是否传递第二个参数
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError(
        "myApply 第二个参数不为数组并且不为类数组对象抛出错误"
      );
    } else {
      args = Array.from(args); // 转为数组
      result = context[specialPrototype](args); // 执行函数并展开数组，传递函数参数
    }
  } else {
    result = context[specialPrototype](); // 执行函数
  }
  delete context[specialPrototype]; // 删除上下文对象的属性
  return result; // 返回函数执行结果
};
```

# 三、bind

当使用 bind 方法返回的函数时，它的调用方式和使用 new 关键字时的行为是不同的，我们来看下面的例子：

## 1.注意

### 1.bind返回的方法普通调用

例子1：使用 **`bind`** 方法进行普通函数调用

```jsx
function greet(name) {
  console.log(`你好，${name}！我的名字是${this.name}。`);
}

const person = {
  name: "小明",
};

const boundGreet = greet.bind(person, "小红");
boundGreet(); // 输出：你好，小红！我的名字是小明。
```

在这个例子中，我们有一个函数 **`greet`**，它接受一个参数 **`name`** 并输出一条问候消息，其中使用了 **`this.name`**。然后我们有一个对象 **`person`**，其中有一个 **`name`** 属性。我们使用 **`bind`** 方法创建了一个新的函数 **`boundGreet`**，其中 **`this`** 被绑定到 **`person`**，并且 **`greet`** 函数的第一个参数被设置为 **`"小红"`**。

当我们调用 **`boundGreet()`** 时，它会以 **`person`** 作为 **`this`** 上下文来调用原始的 **`greet`** 函数，并将 **`name`** 参数设置为 **`"小红"`**。输出显示了使用提供的名字和 **`person`** 对象的 **`name`** 属性构成的问候消息。



### 2.bind返回的方法用new调用

例子2：使用 **`bind`** 方法进行构造函数调用（使用 **`new`**）

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const createYoungPerson = Person.bind(null, "小明");
const youngPerson = new createYoungPerson(25);

console.log(youngPerson.name); // 输出：小明
console.log(youngPerson.age); // 输出：25
```

在这个例子中，我们有一个构造函数 **`Person`**，它接受两个参数 **`name`** 和 **`age`**，并将它们分别赋值给创建的对象的 **`this.name`** 和 **`this.age`** 属性。

我们使用 **`bind`** 方法创建一个部分应用函数 **`createYoungPerson`**，其中 **`this`** 被设置为 **`null`**，并且 **`Person`** 构造函数的第一个参数被设置为 **`"小明"`**。将 **`this`** 设置为 **`null`** 是因为在使用 **`new`** 调用时，它将不会被使用。

然后，我们使用 **`new createYoungPerson(25)`** 来创建一个名为 **`youngPerson`** 的新对象，其中的 **`name`** 属性被设置为 **`"小明"`**，**`age`** 属性被设置为 **`25`**，因为我们使用 **`bind`** 部分应用了 **`Person`** 构造函数。构造函数内部的 **`this`** 上下文被设置为新创建的实例对象 **`youngPerson`**，构造函数根据参数初始化了 **`name`** 和 **`age`** 属性。

结果，**`youngPerson`** 对象现在具有 **`name`** 属性设置为 **`"小明"`**，**`age`** 属性设置为 **`25`**。



综上所述，**`bind`** 方法允许我们创建一个新函数，并为其指定特定的 **`this`** 上下文和预先填充的初始参数。当以普通函数调用时，**`this`** 上下文被设置为提供的值；而当使用 **`new`** 关键字调用时，**`this`** 上下文被设置为新创建的实例。

部分应用（Partial Application）是一种函数编程的概念，指的是固定函数的一个或多个参数，然后返回一个新函数，该新函数可以接受剩余的参数。

在这个上下文中，使用 **`bind`** 部分应用了 **`Person`** 构造函数意味着我们创建了一个新的函数，将 **`Person`** 构造函数的某些参数预先设置好，以便在后续调用时只需要传递剩余的参数即可。

让我们回顾一下 **`bind`** 方法的使用方式：**`bind`** 方法允许我们绑定一个函数的 **`this`** 上下文并预先设置其参数，返回一个新的函数。这个新函数在调用时，不仅继承了原函数的功能，而且绑定了预先设置的参数。

示例：

```js
function add(a, b) {
  return a + b;
}

const addFive = add.bind(null, 5);
console.log(addFive(10)); // Output: 15
```

在这个例子中，我们有一个简单的 **`add`** 函数，它接受两个参数 **`a`** 和 **`b`**，并返回它们的和。

通过使用 **`bind`** 方法，我们创建了一个新函数 **`addFive`**，并将 **`add`** 函数的第一个参数 **`a`** 设置为 **`5`**。这样，**`addFive`** 函数就成为一个部分应用函数，其中的 **`a`** 参数被预先设置为 **`5`**。

当我们调用 **`addFive(10)`** 时，实际上是调用了原始函数 **`add`**，并将 **`a`** 设置为 **`5`**，然后传入的 **`b`** 参数是 **`10`**，所以结果是 **`5 + 10`**，输出为 **`15`**。

类似地，我们的测试用例中，通过 **`Person.bind(null, "Alice")`** 创建了一个部分应用函数 **`createYoungPerson`**，其中 **`Person`** 构造函数的第一个参数 **`name`** 被预先设置为 **`"Alice"`**。然后我们使用 **`new createYoungPerson(25)`**，传入剩余的参数 **`25`** 来创建一个新的 **`Person`** 实例对象，其中 **`name`** 设置为 **`"Alice"`**，**`age`** 设置为 **`25`**。这就是在构造函数调用时的部分应用。

## 2.应用

1. 保存函数参数
   1. 闭包
2. 回调函数this丢失问题
   1. 因为传递过去的`this.handleMessage`是一个函数内存地址，没有上下文对象，也就是说该函数没有绑定它的`this`指向。
   2. 这也是为什么`react`的`render`函数在绑定回调函数的时候，也要使用bind绑定一下`this`的指向，也是因为同样的问题以及原理。

## 3.原理

### ①原生bind的功能

1. **绑定 this 上下文：** **`bind`** 方法允许你明确指定函数在执行时的 **`this`** 上下文。你可以将一个对象作为 **`bind`** 的第一个参数，绑定后的函数在执行时，**`this`** 将会指向这个绑定的对象。
2. **预设参数：** 除了第一个参数（绑定的 **`this`** 对象），你可以通过 **`bind`** 方法传递额外的参数，这些参数将在调用绑定函数时作为预设的参数传入，从而固定部分函数参数。
3. **返回新函数：** **`bind`** 方法不会修改原函数，而是返回一个新的绑定函数。这样做不会影响到原函数本身。
4. **支持构造函数：** 绑定函数也可以通过 **`new`** 关键字来创建实例，因此支持构造函数绑定。在这种情况下，绑定函数的 **`this`** 将被忽略，而新创建的对象将作为函数的上下文。
5. **支持原型继承：** 绑定函数继承自原函数的原型，保持原型链的完整性。
6. **支持取消绑定：** 可以使用 **`Function.prototype.unbind`** 或 ES6 的 **`Function.prototype.@@unbound`** 来取消绑定，将绑定函数恢复成原始的未绑定函数。
7. **支持 `length` 属性：** 绑定函数的 **`length`** 属性返回原函数的参数个数，这有助于保持函数签名的一致性。



### ②普通实现

```jsx
Function.prototype.mybind = function (context, ...outArgs) {
  // 1.判断context类型
  if (context === undefined || context === null) {
    context = window;
  } else {
    context = Object(context);
  }
  // 2.唯一属性保存
  const uniquePrototype = Symbol("unique");
  context[uniquePrototype] = this;

  // 3.返回调用的函数
  return function (...innerArgs) {
    const res = context[uniquePrototype](...outArgs, ...innerArgs);
    return res;
  };
};
这个会存在内存泄露，没删除属性，删除无法重复执行
```

注意下缺陷

1. **不支持构造函数绑定：** 与原生的 **`bind`** 函数不同，这个自定义的实现不支持通过 **`new`** 关键字调用绑定函数以创建对象。如果尝试使用 **`new`** 关键字来实例化绑定函数，会导致错误或意外的行为。
2. **不支持原型继承：** 当使用原生的 **`bind`** 函数绑定函数时，绑定函数和原函数之间共享原型。然而，这个自定义的实现并没有处理这种情况，导致原型继承相关的特性无法正确传递。
3. **不支持 `length` 属性：** 在 JavaScript 中，函数对象具有一个 **`length`** 属性，它返回函数定义的参数数量。使用原生的 **`bind`** 函数绑定后的函数会保留正确的 **`length`** 属性，但这个自定义实现并没有处理 **`length`** 属性，它会返回原始函数的参数数量，而不是绑定函数的参数数量。
4. **不支持取消绑定：** 原生的 **`bind`** 函数返回的绑定函数是可以取消绑定的（通过使用 **`Function.prototype.unbind`** 或者 ES6 的 **`Function.prototype.@@unbound`**），但是这个自定义的实现并没有提供取消绑定的方法。
5. **不支持一次性参数绑定：** 原生的 **`bind`** 函数允许在绑定时将参数绑定到特定值，这样每次调用绑定函数时这些参数都会被自动传入。这个自定义实现并没有提供这样的功能。

综上所述，尽管这个自定义的 **`bind`** 函数在一些简单的情况下能够工作得很好，但是在涉及更复杂的场景时，它可能会出现一些问题。为了避免这些缺陷，建议在实际开发中使用原生的 **`bind`** 函数

### ③解决缺陷

> bind 的实现对比其他两个函数略微地复杂了一点，涉及到参数合并(类似函数柯里化)，因为 bind 需要返回一个函数，需要判断一些边界问题，以下是 bind 的实现

- `bind` 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 `new` 的方式，我们先来说直接调用的方式
- 对于直接调用来说，这里选择了 `apply` 的方式实现，但是对于参数需要注意以下情况：因为 `bind` 可以实现类似这样的代码 `f.bind(obj, 1)(2)`，所以我们需要将两边的参数拼接起来
- 最后来说通过 `new` 的方式，对于 `new` 的情况来说，不会被任何方式改变 `this`，所以对于这种情况我们需要忽略传入的 `this`
- 箭头函数的底层是`bind`，无法改变`this`，只能改变参数

## 4.实现

- 对于普通函数，绑定`this`指向
- 对于构造函数，要保证原函数的原型对象上的属性不能丢失

```js
// 优化实现
Function.prototype.myBindNew = function (context = window, ...outArgs) {
  // context 是 bind 传入的 this
  // args 是 bind 传入的各个参数
  // this表示调用bind的函数
  let self = this;
  //返回了一个函数，...innerArgs为实际调用时传入的参数
  let fBound = function (...innerArgs) {
    //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
    // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      // 函数执行，构造函数的this指向他新创建的对象
      this instanceof fBound ? this : context,
      outArgs.concat(innerArgs) // 拼接参数
    );
  };

  // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
  // 实现继承的方式: 使用Object.create
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

// 测试用例

function Person(name, age) {
  console.log("Person name：", name);
  console.log("Person age：", age);
  console.log("Person this：", this); // 构造函数this指向实例对象
}

// 构造函数原型的方法
Person.prototype.say = function () {
  console.log("person say");
};

// 普通函数
function normalFun(name, age) {
  console.log("普通函数 name：", name);
  console.log("普通函数 age：", age);
  console.log("普通函数 this：", this); // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
}

var obj = {
  name: "poetries",
  age: 18
};

// 先测试作为构造函数调用
var bindFun = Person.myBindNew(obj, "poetry1"); // undefined
var a = new bindFun(10); 
// Person name: poetry1
// Person age: 10
// Person this: Person {say: ƒ (), constructor: Object}

a.say(); // person say

// 再测试作为普通函数调用
var bindNormalFun = normalFun.myBindNew(obj, "poetry2"); // undefined
bindNormalFun(12);
// 普通函数name: poetry2
// 普通函数 age: 12
// 普通函数 this: {name: 'poetries', age: 18}
```

1. **`this instanceof fBound`** 表达式判断当前的 **`fBound`** 函数是否是作为构造函数（使用 **`new`**）调用的。这是通过检查当前 **`this`** 对象是否是 **`fBound`** 的实例来实现的。
2. 如果 **`fBound`** 是作为构造函数调用的（即 **`this instanceof fBound`** 返回 **`true`**），则表示绑定函数被用于创建一个实例。在这种情况下，我们希望 **`this`** 被设置为新创建的实例对象，以便在绑定函数中使用这个新实例。所以 **`this`** 就是我们需要的上下文，即 **`this`** 指向绑定函数创建的实例对象。
3. 如果 **`fBound`** 不是作为构造函数调用的（即 **`this instanceof fBound`** 返回 **`false`**），则表示绑定函数是普通函数调用的。在这种情况下，我们希望 **`this`** 被设置为传入的 **`context`** 值，以便在绑定函数中使用指定的上下文。所以 **`context`** 就是我们需要的上下文，即 **`this`** 指向我们传入 **`myBindNew`** 函数的 **`context`** 参数。









