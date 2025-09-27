const fs = require("fs");
const path = require("path");

// 包装为promise，await后面的表达式都是被包装成promise
const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // 这里是传进来的读文件的函数的函数调用
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
};

// promise化
let asyncReadFile = promisify(fs.readFile);

function* read() {
  let content1 = yield asyncReadFile(
    path.join(__dirname, "./data/name.txt"),
    "utf8"
  );
  let content2 = yield asyncReadFile(
    path.join(__dirname, "./data/" + content1),
    "utf8"
  );
  return content2;
}

// 实现co原理：自动执行，从上往下await依次执行，只有上一个完成，流程才不会阻塞
function co(it) {
  console.log("✅ ~ 生成器it:", it);
  // it 迭代器
  return new Promise((resolve, reject) => {
    // 异步迭代 需要根据函数来实现
    function autoNext(data) {
      console.log("✅ ~ data首次调用传递的data:", data);
      // 递归得有中止条件
      let { value, done } = it.next(data);
      if (done) {
        resolve(value); // 直接让promise变成成功 用当前返回的结果
      } else {
        // 创建一个状态为resolve的promise
        Promise.resolve(value)
          .then((data) => {
            console.log("✅ ~ data:", data);
            console.log("✅ ~ value:", value);
            autoNext(data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
    // 首次调用
    autoNext();
  });
}

co(read())
  .then((res) => {
    console.log("✅ ~ res:", res);
  })
  .catch((err) => {
    console.log("✅ ~ err:", err);
  });
