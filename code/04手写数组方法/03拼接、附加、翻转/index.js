const FindArray = require("../02检索类/index");

class OpArray extends FindArray {
  myConcat(...array) {
    let arr = this.data;
    let result = [...arr];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result = [...result, ...array[i]];
      } else {
        result.push(array[i]);
      }
    }
    return result;
  }

  myJoin(seperate) {
    let seperateStr = seperate === undefined ? "," : seperate;
    let arr = this.data;
    const result = arr.reduce((acc, item, index) => {
      if (index === 0) {
        return `${item}`;
      } else {
        return `${acc}${seperateStr}${item}`;
      }
    });
    return result;
  }

  myReverse() {
    let array = this.data;
    let mid = Math.floor(this.data.length / 2);
    const arrayLength = array.length - 1;
    let temp;
    for (let i = 0; i <= mid; i++) {
      temp = array[i];
      array[i] = array[arrayLength - i];
      array[arrayLength - i] = temp;
    }
    return array;
  }
}

// const findArr = new OpArray();
// findArr.initArr([1, 2, 3, 4, 5]);

// findArr.logHelper("concat", findArr.getArray(), () => {
//   return findArr.myConcat(6, [7, 8]);
// });

// findArr.logHelper("concat", findArr.getArray(), () => {
//   return findArr.myJoin("$");
// });

// findArr.logHelper("reverse", findArr.getArray(), () => {
//   return findArr.myReverse();
// });

module.exports = OpArray;
