# new

# 一、应用

new 关键词的主要作用就是执行一个构造函数、返回一个实例对象，在 new 的过程中，根据构造函数的情况，来确定是否可以接受参数的传递。

# 二、原理

1. 创建一个新对象
2. 对象连接到构造函数原型上，并绑定 `this`（this 指向新对象）
3. 执行构造函数代码（为这个新对象添加属性）
4. 返回新对象

## 1.new内部原理

- `new` 做了那些事？
- `new` 返回不同的类型时会有什么表现？
- 手写 new 的实现过程

`new` 操作符可以帮助我们构建出一个实例，并且绑定上 this，内部执行步骤可大概分为以下几步：

1. 创建一个新对象
2. 对象连接到构造函数原型上，并绑定 `this`（this 指向新对象）
3. 执行构造函数代码（为这个新对象添加属性）
4. 返回新对象

## 2.new的例外

new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象

### ①不使用new

那么问题来了，如果不用 `new` 这个关键词，结合上面的代码改造一下，去掉 `new`，会发生什么样的变化呢？我们再来看下面这段代码

```jsx
function Person(){
  this.name = 'Jack';
}
var p = Person();
console.log(p) // undefined
console.log(name) // Jack
console.log(p.name) // 'name' of undefined
```

• 从上面的代码中可以看到，我们没有使用 `new` 这个关键词，返回的结果就是 `undefined`。其中由于 `JavaScript` 代码在默认情况下 `this` 的指向是 `window`，那么 `name` 的输出结果就为 `Jack`，这是一种不存在 `new` 关键词的情况。

### ②return 对象

```js
function Person(){
   this.name = 'Jack'; 
   return {age: 18}
}
var p = new Person(); 
console.log(p)  // {age: 18}
console.log(p.name) // undefined
console.log(p.age) // 18
```

通过这段代码又可以看出，当构造函数最后 `return` 出来的是一个和 `this` 无关的对象时，`new 命令会直接返回这个新对象`，`而不是通过 new 执行步骤生成的 this 对象`

但是这里要求构造函数必须是返回一个对象，`如果返回的不是对象，那么还是会按照 new 的实现步骤，返回新生成的对象`。接下来还是在上面这段代码的基础之上稍微改动一下

```js
function Person(){
   this.name = 'Jack'; 
   return 'tom';
}
var p = new Person(); 
console.log(p)  // {name: 'Jack'}
console.log(p.name) // Jack
```

可以看出，当构造函数中 return 的不是一个对象时，那么它还是会根据 new 关键词的执行逻辑，生成一个新的对象（绑定了最新 this），最后返回出来

# 三、手写

- 创建一个全新的对象`obj`，继承构造函数的原型：这个对象的`__proto__`要指向构造函数的原型`prototype`
- 执行构造函数，使用 `call/apply` 改变 `this` 的指向（将`obj`作为`this`）
- 返回值为`object`类型则作为`new`方法的返回值返回，否则返回上述全新对象`obj`

在自定义的 **`myNew`** 函数中检查构造函数是否返回一个对象，是为了处理构造函数的特殊情况。在 JavaScript 中，构造函数可以选择返回一个对象，而不仅仅是默认创建的实例对象。

正常情况下，当我们使用 **`new`** 运算符调用构造函数时，它会在构造函数执行完毕后返回一个新创建的对象作为实例。但是，构造函数也有可能通过使用 **`return`** 语句显式地返回一个对象（可以是任何对象，甚至是与构造函数本身无关的对象）。

```js
function myNew(constructor, ...args) {
  // 1.创建一个对象, 将构造函数的原型设置为对象的__proto__
  const newObj = Object.create(constructor.prototype);
  // 2.将this指向新创建的对象
  let res = constructor.call(newObj, ...args);
  // 3.判断构造函数是否返回一个对象
  return typeof res === "object" ? res : newObj;
}
```

