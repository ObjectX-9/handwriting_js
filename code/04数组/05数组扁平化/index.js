const CurdArray = require("../04添加、删除、追加值/index");

class FlatArray extends CurdArray {
  // 错误示例
  //   myFlatFor() {
  //     const arr = [...this.data];
  //     let res = [];
  //     for (let i = 0; i < arr.length; i++) {
  //       if (Array.isArray(arr[i])) {
  //         // this.myFlatFor(arr[i])是不正确的，因为myFlatFor方法在设计上是不接受参数的
  //         res = [...res, ...this.myFlatFor(arr[i])];
  //       } else {
  //         res.push(arr[i]);
  //       }
  //     }
  //     return res;
  //   }
  myFlatFor() {
    const arr = this.data;
    const flatFunc = (array) => {
      let result = [];
      for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          result = [...result, ...flatFunc(array[i])];
        } else {
          result.push(array[i]);
        }
      }
      return result;
    };
    return flatFunc(arr);
  }

  myFlatWhile() {
    const arr = this.data;
    const whileFlat = (array) => {
      while (
        array.some((item) => {
          return Array.isArray(item);
        })
      ) {
        // 这里主要是arr被展开一次了，然后调用了concat，数组元素仍然是数组的会作为整体合并，就实现了展开一层
        array = [].concat(...array);
        //array = Array.prototype.concat.apply([],array);
      }
      return array;
    };
    return whileFlat(arr);
  }

  // 递归的思路
  myFlatReduce() {
    const arr = this.data;
    const whileReduce = (array) => {
      return array.reduce((res, next) => {
        return res.concat(Array.isArray(next) ? whileReduce(next) : next);
      }, []);
    };
    return whileReduce(arr);
  }

  myFlatStack() {
    const arr = this.data;
    const whileStack = (array) => {
      const stack = [...array];
      const result = [];
      while (stack.length) {
        // 如果是数组，则展开一层，放到栈顶，每次从栈顶获取判断
        const stackTop = stack.shift();
        if (Array.isArray(stackTop)) {
          stack.unshift(...stackTop);
        } else {
          result.push(stackTop);
        }
      }
      return result;
    };
    return whileStack(arr);
  }
}

// const flatArr = new FlatArray();
// flatArr.initArr([1, 2, 3, [4, 5], [6, [7, [8]]]]);

// flatArr.logHelper("flatFor", flatArr.getArray(), () => {
//   return flatArr.myFlatFor();
// });

// flatArr.logHelper("flatWhile", flatArr.getArray(), () => {
//   return flatArr.myFlatWhile();
// });

// flatArr.logHelper("flatReduce", flatArr.getArray(), () => {
//   return flatArr.myFlatReduce();
// });

// flatArr.logHelper("flatStack", flatArr.getArray(), () => {
//   return flatArr.myFlatStack();
// });
module.exports = FlatArray;
