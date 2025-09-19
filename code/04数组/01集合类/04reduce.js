// 帮助函数：它能更好地解释每个方法的功能:接受什么作为输入，返回什么，以及它是否对数组进行了修改。
function logHelper(operateName, array, callback) {
  const input = [...array];
  const result = callback(array);

  console.log({
    operation: operateName,
    arrayBefore: input,
    arrayAfter: array,
    // 是否修改数组
    mutates: mutatesArray(input, array),
    result,
  });
}

// 浅比较判断是否修改了数组
function mutatesArray(array1, array2) {
  if (array1.length !== array2.length) {
    return true;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return true;
    }
  }
  return false;
}

Array.prototype.myReduce = function (array, callback, initValue) {
  let acc = initValue;
  let start = 0;

  if (initValue === undefined) {
    acc = array[0];
    start = 1;
  }

  for (let i = start; i < array.length; i++) {
    console.log("✅ ~ i:", i);
    acc = callback(acc, array[i], i, array);
  }
  return acc;
};

logHelper("reduce", [1, 2, 3, 4, 5], (array) =>
  Array.prototype.myReduce(array, (sum, number) => sum * number)
);

const result = [1, 2, 3, 4, 5].reduce((sum, number, index) => {
  console.log("✅ ~ index:", number, index);
  return sum * number;
});
console.log("✅ ~ 原生reduce result:", result);
