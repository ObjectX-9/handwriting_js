const FlatArray = require("../05数组扁平化/index");
class NonRepeatArray extends FlatArray {
  myForDelRepeat() {
    const arr = [...this.data];
    const res = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
      let flag = true;
      for (let j = 0; j < res.length; j++) {
        if (arr[i] === res[j]) {
          flag = false;
          break;
        }
      }
      if (flag) res.push(arr[i]);
    }
    return res;
  }

  myIndexOfDelRepeat() {
    const arr = [...this.data];
    const res = [arr[0]];
    for (let i = 0; i < arr.length; i++) {
      if (res.indexOf(arr[i]) === -1) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  myIndexOfFilterDelRepeat() {
    const arr = [...this.data];
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    }, []);
  }

  mySortAdjacentDelRepeat() {
    let arr = [...this.data];
    const res = [];
    arr = arr.sort();
    for (let i = 0; i < arr.length; i++) {
      // 跟前一个，后一个对比都是一样的
      if (arr[i] !== arr[i + 1]) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  myUseObjDelRepeat() {
    let arr = [...this.data];
    const res = [];
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        res.push(arr[i]);
        obj[arr[i]] = 1;
      } else {
        obj[arr[i]]++;
      }
    }
    console.log("✅ ~ obj:", obj);
    return res;
  }

  myNewSetDelRepeat() {
    const arr = [...this.data];
    return [...new Set(arr)];
  }

  myArrayFromNewSetDelRepeat() {
    const arr = [...this.data];
    return Array.from(new Set(arr));
  }
}

const repeatArr = new NonRepeatArray();
repeatArr.initArr([2, 2, 3, 3, 4, 5, 5, 6]);

repeatArr.logHelper("myForDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myForDelRepeat();
});

repeatArr.logHelper("myIndexOfDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myIndexOfDelRepeat();
});

repeatArr.logHelper("myIndexOfFilterDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myIndexOfFilterDelRepeat();
});

repeatArr.logHelper("mySortAdjacentDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.mySortAdjacentDelRepeat();
});

repeatArr.logHelper("myUseObjDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myUseObjDelRepeat();
});

repeatArr.logHelper("myNewSetDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myNewSetDelRepeat();
});

repeatArr.logHelper("myArrayFromNewSetDelRepeat", repeatArr.getArray(), () => {
  return repeatArr.myArrayFromNewSetDelRepeat();
});
