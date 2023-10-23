// generator生成器  生成迭代器iterator

// 默认这样写的类数组是不能被迭代的，缺少迭代方法
let likeArray = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

// ===========实现类数组解构的迭代器方法===================
likeArray[Symbol.iterator] = function () {
  // 迭代器是一个对象 对象中有next方法 每次调用next 都需要返回一个对象 {value,done}
  let index = 0;
  return {
    next: () => {
      // 会自动调用这个方法
      console.log("index", index);
      return {
        // this 指向likeArray
        value: this[index],
        done: index++ === this.length,
      };
    },
  };
};

let arr = [...likeArray];
// 每一个迭代器相互是不影响的
const gen = likeArray[Symbol.iterator]();
console.log("✅ ~ arr:", arr);
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
