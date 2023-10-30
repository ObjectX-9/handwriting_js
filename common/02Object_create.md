# 02Object.create

# 一、应用

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 [MDN](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fcreate)

# 二、原理

```js
Object.create(proto[, propertiesObject])
```

+ proto必填参数，是新对象的原型对象，如上面代码里新对象的__proto__指向person。注意，如果这个参数是null，那新对象就彻彻底底是个空对象，没有继承Object.prototype上的任何属性和方法，如hasOwnProperty()、toString()等。

```js
var a = Object.create(null);
console.dir(a); // {}
console.log(a.__proto__); // undefined
console.log(a.__proto__ === Object.prototype); // false
console.log(a instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object
```

+ propertiesObject是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用hasOwnProperty()获取的，而不是原型对象上的）的描述符及相应的属性名称。

```js
var bb = Object.create(null, {
    a: {
        value: 2,
        writable: true,
        configurable: true
    }
});
console.dir(bb); // {a: 2}
console.log(bb.__proto__); // undefined
console.log(bb.__proto__ === Object.prototype); // false
console.log(bb instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

// ----------------------------------------------------------

var cc = Object.create({b: 1}, {
    a: {
        value: 3,
        writable: true,
        configurable: true
    }
});
console.log(cc); // {a: 3}
console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false 说明第二个参数设置的是新对象自身可枚举的属性
console.log(cc.__proto__); // {b: 1} 新对象cc的__proto__指向{b: 1}
console.log(cc.__proto__ === Object.protorype); // false
console.log(cc instanceof Object); // true cc是对象，原型链上肯定会出现Object
```



# 三、手写

## 1.Object.defineProperties

Object.defineProperties() 是 JavaScript 中的一个方法，它用于定义或修改对象的多个属性的属性描述符。通过这个方法，可以一次性地给一个对象设置多个属性的特性，包括属性的值、可枚举性、可写性、可配置性等。

```
Object.defineProperties(obj, props);
```

参数：

- **`obj`**：要定义属性的目标对象。

- `props`

  ：一个包含属性名称和对应属性描述符的对象。每个属性描述符都是一个包含属性特性的对象，可以包含以下属性：

  - **`value`**：属性的值。
  - **`writable`**：如果为 **`true`**，则属性的值可以被修改。默认为 **`false`**。
  - **`enumerable`**：如果为 **`true`**，则属性可以被枚举（使用 **`for...in`** 或 **`Object.keys()`**）。默认为 **`false`**。
  - **`configurable`**：如果为 **`true`**，则属性的特性可以被修改，属性可以被删除。默认为 **`false`**。
  - **`get`**：一个函数，用于获取属性的值。
  - **`set`**：一个函数，用于设置属性的值。

返回值：

- 返回被传递给 **`obj`** 参数的对象。

示例：

```js
const obj = {};

Object.defineProperties(obj, {
  prop1: {
    value: 42,
    writable: false,
    enumerable: true
  },
  prop2: {
    get: function() {
      return 'Hello';
    },
    set: function(value) {
      console.log('Setting prop2 to:', value);
    },
    enumerable: true
  }
});

console.log(obj.prop1); // Output: 42
obj.prop1 = 100; // No effect as writable is set to false
console.log(obj.prop1); // Output: 42

console.log(obj.prop2); // Output: Hello
obj.prop2 = 'World'; // Output: Setting prop2 to: World
console.log(obj.prop2); // Output: Hello
```

在上面的示例中，Object.defineProperties() 方法被用于将两个属性 prop1 和 prop2 定义在对象 obj 上。prop1 是一个简单的数据属性，而 prop2 是一个拥有 get 和 set 方法的访问器属性。使用该方法可以对多个属性进行一次性的定义和设置，使代码更简洁和易于维护。

## 2.实现

```js
function myObject(obj, props) {
  // 创建一个构造函数
  function F() {}
  // 创建一个对象
  const newObj = new F();
  // 将该函数的原型设置为传入的obj
  newObj.prototype = obj;
  // 判断是否有props
  if (props) {
    Object.defineProperties(newObj, props);
  }

  return newObj;
}

const obj1 = {
  name: "test"
};

const obj2 = myObject(obj1, {
  name2: {
    value: "obj2",
    enumerable: true
  }
});

console.log("obj2", obj2);
```

# 参考文档

[Object.create()、new Object()和{}的区别](https://juejin.cn/post/6844903917835436045?searchId=2023072819121405C3E4A9FD7D6FDABA0F)
