const fs = require("fs");
const path = require("path");

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

// 这样写太繁琐 需要借助co来实现
let re = read();
let { value } = re.next();
value
  .then((data) => {
    console.log("✅ ~ data:", data);
    // 除了第一次传参没有意义外 剩下的传参都赋予了上一次的返回值
    let { value } = re.next(data);
    value.then((d) => {
      let { value, done } = re.next(d);
      console.log(value, done);
    });
  })
  .catch((err) => {
    re.throw(err); // 手动抛出错误 可以被try catch捕获
  });
