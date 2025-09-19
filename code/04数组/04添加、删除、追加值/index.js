const OpArray = require("../03拼接、附加、翻转/index");

class CurdArray extends OpArray {
  myShift() {
    const arr = this.data;
    const result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      arr[i - 1] = arr[i];
    }
    arr.length -= 1;
    return result;
  }

  myUnShift(...value) {
    const arr = this.data;
    const mergeArr = [...value, ...arr];
    for (let i = 0; i < mergeArr.length; i++) {
      arr[i] = mergeArr[i];
    }
    return arr.length;
  }

  mySlice(start, end) {
    const arr = this.data;
    const arrLength = arr.length;
    let startIndex = start < 0 ? arrLength + start : start;
    if (startIndex < -arrLength) return (startIndex = 0);
    if (startIndex > arrLength) return [];
    let endIndex = end < 0 ? arrLength + end : end;
    if (endIndex < 0) return [];
    const result = [];
    for (let i = startIndex; i < endIndex; i++) {
      result.push(arr[i]);
    }
    return result;
  }

  mySplice(start, removeNum, ...addValues) {
    const arr = this.data;
    // 第一段: 无需处理
    const firstPart = arr.slice(0, start);
    // 第二段: 删除的部分
    const delPart = arr.slice(start, start + removeNum);
    console.log("✅ ~ delPart:", delPart);
    // 第三段: 剩余的部分
    const surplusPart = arr.slice(start + removeNum);
    // 增加的部分
    const addPart = [...addValues];
    const result = [...firstPart, ...addPart, ...surplusPart];
    return result;
  }

  myPop() {
    const arr = this.data;
    const delElem = arr[arr.length - 1];
    arr.length -= 1;
    return delElem;
  }

  myPush(values) {
    const arr = this.data;
    const arrLength = arr.length;
    const addArrLength = values.length;
    arr = [...arr, ...values];
    arr.length = arrLength + addArrLength;
  }

  myFill(fillNum, start, end) {
    const arr = this.data;
    let startIndex = start < 0 ? start + arr.length : start;
    if (startIndex > arr.length) return arr;
    let endIndex = end < 0 ? end + arr.length : end;
    if (endIndex < 0) return arr;
    for (let i = startIndex; i < endIndex; i++) {
      arr[i] = fillNum;
    }
    return arr;
  }
}

const findArr = new CurdArray();
findArr.initArr([1, 2, 3, 4, 5]);
// findArr.logHelper("shift", findArr.getArray(), () => {
//   return findArr.myShift();
// });

// findArr.logHelper("shift", findArr.getArray(), () => {
//   return findArr.myUnShift(1000);
// });

// findArr.logHelper("slice", findArr.getArray(), () => {
//   return findArr.mySlice(2, 4);
// });

// findArr.logHelper("splice", findArr.getArray(), () => {
//   return findArr.mySplice(2, 2, 9, 10, 11);
// });

// findArr.logHelper("fill", findArr.getArray(), () => {
//   return findArr.myFill(999, 2, 4);
// });

module.exports = CurdArray;
