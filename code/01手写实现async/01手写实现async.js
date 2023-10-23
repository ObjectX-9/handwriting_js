// 实现生成器实现
function* asyncGetResult() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
      console.log("value1");
    }, 1000);
  });

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
      console.log("value2");
    }, 500);
  });

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
      console.log("value3");
    }, 100);
  });
}

const gen = asyncGetResult();
console.log(gen);
// =============log: 3, 2, 1===============
// const value1 = gen.next();
// console.log("✅ ~ value1:", value1);
// const value2 = gen.next();
// console.log("✅ ~ value2:", value2);
// const value3 = gen.next();
// console.log("✅ ~ value3:", value3);

// =============生成器模拟运行：需要手动执行,每次执行得嵌套===============
// gen.next().value.then((res) => {
//   console.log("✅ ~ res1:", res);
//   gen.next().value.then((res) => {
//     console.log("✅ ~ res2:", res);
//     gen.next().value.then((res) => {
//       console.log("✅ ~ res3:", res);
//     });
//   });
// });

// =================通过递归实现自动执行===========
function co(gen) {
  const valueObj = gen.next();
  if (valueObj.done) {
    return;
  }
  valueObj.value.then((res) => {
    console.log("✅ ~ res1:", res);
    co(gen);
  });
}

co(gen);
