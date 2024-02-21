const CollectArray = require("../01集合类/index");

class FindArray extends CollectArray {
  myFindIndex(callback, thisValue) {
    const arr = thisValue ? thisValue.data : this.data;
    if (arr.length === 0) return -1;
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  myFind(callback, thisValue) {
    const arr = thisValue ? thisValue.data : this.data;
    if (arr.length === 0) return;
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return undefined;
  }

  myIndexOf(elem, startIndex) {
    const arr = this.data;
    const arrLength = arr.length;
    let startFindIndex = startIndex < 0 ? arrLength + startIndex : startIndex;
    if (startFindIndex > arrLength || arrLength === 0) return -1;
    if (startFindIndex < -arrLength) startFindIndex = 0;
    for (let i = startFindIndex; i < arrLength; i++) {
      if (arr[i] === elem) {
        return i;
      }
    }
    return -1;
  }

  myLastIndexOf(elem, startIndex) {
    const arr = this.data;
    const arrLength = arr.length;
    let startFindIndex = startIndex < 0 ? arrLength + startIndex : startIndex;
    if (startFindIndex > arrLength) startFindIndex = arrLength;
    if (startFindIndex < -arrLength) return -1;
    for (let i = startFindIndex; i >= 0; i--) {
      if (arr[i] === elem) return i;
    }
    return -1;
  }

  myEvery(callback, thisValue) {
    const arr = thisValue ? thisValue.data : this.data;
    if (arr.length === 0) return false;

    for (let i = 0; i < arr.length; i++) {
      if (!callback(arr[i], i, arr)) {
        return false;
      }
    }
    return true;
  }

  mySome(callback, thisValue) {
    const arr = thisValue ? thisValue.data : this.data;
    if (arr.length === 0) return false;

    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i, arr)) {
        return true;
      }
    }
    return false;
  }

  myIncludes(elem, startIndex) {
    const arr = this.data;
    const arrLength = arr.length;
    let startFindIndex = startIndex < 0 ? startIndex + arrLength : startIndex;
    if (startFindIndex > arrLength) return false;
    if (startFindIndex < 0) startFindIndex = 0;
    for (let i = startFindIndex; i < arrLength; i++) {
      if (arr[i] === elem) return true;
    }
    return false;
  }
}

// const findArr = new FindArray();
// findArr.initArr([2, 2, 3, 4, 5, 5]);

// findArr.logHelper("findIndex", findArr.getArray(), () => {
//   return findArr.myFindIndex((item, index, arr) => {
//     return item === 3;
//   });
// });

// findArr.logHelper("find", findArr.getArray(), () => {
//   return findArr.myFind((item, index, arr) => {
//     return item === 5;
//   });
// });

// findArr.logHelper("indexOf", findArr.getArray(), () => {
//   return findArr.myIndexOf(2, -5);
// });

// findArr.logHelper("lastIndexOf", findArr.getArray(), () => {
//   return findArr.myLastIndexOf(2, -5);
// });

// findArr.logHelper("every", findArr.getArray(), () => {
//   return findArr.myEvery((item, index, arr) => {
//     return item > 2;
//   });
// });

// findArr.logHelper("some", findArr.getArray(), () => {
//   return findArr.mySome((item, index, arr) => {
//     return item > 10;
//   });
// });

// findArr.logHelper("includes", findArr.getArray(), () => {
//   return findArr.myIncludes(2, 6);
// });

module.exports = FindArray;
