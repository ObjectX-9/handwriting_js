const BasicArray = require("../00实现数组结构/index");
class CollectArray extends BasicArray {
  initArr(arr) {
    this.data = arr;
    this.length === arr.length;
  }

  myForEach(callback, thisValue) {
    const array = thisValue ? thisValue.data : this.data;
    // `forEach()` 对于空数组是不会执行回调函数的。
    if (array.length === 0) return;
    // 遍历次数再第一次循环前就会确定，再添加到数组中的元素不会被遍历。
    for (let i = 0; i < array.length; i++) {
      // 它总是返回 undefined值,即使你return了一个值。
      // 如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值。
      array[i] && callback(array[i], i, array);
    }
  }

  myMap(callback, thisValue) {
    const result = [];
    const array = thisValue ? thisValue.data : this.data;
    if (array.length === 0) return [];
    for (let i = 0; i < array.length; i++) {
      result[i] = callback(array[i], i, array);
    }
    // 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值，并没有改变原来的数组。
    return result;
  }

  myFilter(callback, thisValue) {
    const result = [];
    const array = thisValue ? thisValue.data : this.data;
    if (array.length === 0) return [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) result.push(array[i]);
    }
    return result;
  }

  myReduce(callback, initValue, thisValue) {
    const array = thisValue ? thisValue.data : this.data;
    // 如果传递初始值，从0开始
    let start = 0;
    let acc = initValue;
    if (array.length === 0) return acc;
    // 如果不传递初始值，从1开始
    if (initValue === undefined) {
      acc = array[0];
      start = 1;
    }
    for (let i = start; i < array.length; i++) {
      acc = callback(acc, array[i], i, array);
    }
    return acc;
  }
}

// const array = new CollectArray();
// // 初始化一个数组
// array.initArr([1, 2, 3, 4, 5, 6, 7, 8]);

// // forEach
// array.logHelper("forEach", array.getArray(), () => {
//   return array.myForEach((item, index, array) => {
//     // console.log("✅ ~ item:", item);
//   });
// });

// // map
// array.logHelper("map", array.getArray(), () => {
//   return array.myMap((item, index, array) => {
//     return item * 2;
//   });
// });

// // filter
// array.logHelper("filter", array.getArray(), () => {
//   return array.myFilter((item, index, array) => {
//     return item < 4;
//   });
// });

// // reduce
// array.logHelper("reduce", array.getArray(), () => {
//   return array.myReduce((pre, item, index, array) => {
//     return pre * item;
//   }, 0);
// });

module.exports = CollectArray;
