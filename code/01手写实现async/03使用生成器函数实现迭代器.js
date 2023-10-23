// generator生成器  生成迭代器iterator

// 默认这样写的类数组是不能被迭代的，缺少迭代方法
let likeArray = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

// ===========实现类数组解构的迭代器方法===================

// 生成器 碰到yield就会暂停
// function* read(params) {
//   yield 1;
//   yield 2;
// }
// // 生成器返回的是迭代器
// let it = read();
// console.log("✅ ~ it.next():", it.next());
// console.log("✅ ~ it.next():", it.next());
// console.log("✅ ~ it.next():", it.next());

// 使用生成器返回迭代器
likeArray[Symbol.iterator] = function* () {
  let index = 0;
  while (index != this.length) {
    yield this[index++];
  }
};

let arr = [...likeArray];
console.log("✅ ~ arr:", arr);

// 每一个迭代器相互是不影响的
const gen = likeArray[Symbol.iterator]();
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
console.log("✅ ~ likeArray[Symbol.iterator]:", gen.next());
