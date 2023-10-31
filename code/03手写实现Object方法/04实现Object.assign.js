Object.prototype.myAssign = function (target) {
    // 使用严格模式是因为Object('abc')这种默认不可写
    'use strict';
    // 1.判断参数是否正确, 一个目标对象用target表示，源对象从arguments中获取
    // 源对象不能是null | undefined， 由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错。
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    // 2.将target转为对象，自身没有可枚举属性需要变为对象
    const to = Object(target);
    console.log("✅ ~ zhuling Object(target):", to)
    console.log("✅ ~ zhuling to:", Object.getOwnPropertyDescriptors(to))
    
    // 3.循环遍历获取参数arguments
    for(let i = 1; i < arguments.length; i++) {
        // 下一个源对象
        const nextSource = arguments[i];
        if (nextSource !== null) {
            for (let key in nextSource) {
                // 这里使用call，是因为Object.create(null, obj), 这种不会继承Object的方法
                if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
                    to[key] = nextSource[key];
                }
            }
        }
    }
    return to;
}

// 测试用例
let a = {
    name: "advanced",
    age: 18
}
let b = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    }
}

let c = Object.myAssign(a, b);
// Object.assign不可枚举,可写、可配置
console.log("✅ ~ zhuling Object.keys(Object):", Object.keys(Object))
console.log("✅ ~ zhuling c:", c, c.book)
console.log("✅ ~ zhuling a === c:", a === c)

// 测试用例： 测试使用严格模式是因为Object('abc')这种默认不可写
let test1 = "abc";
let test2 = "def";
// Object.myAssign(test1, test2); 

