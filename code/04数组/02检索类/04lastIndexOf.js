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

Array.prototype.myLastFindIndex = function (array, searchVal, startIndex) {
  let start = startIndex === undefined ? array.length : startIndex;
  if (start < -array.length) return -1;
  if (start < 0) {
    start = array.length + start;
    if (start < -array.length) return -1;
  }

  for (let i = start; i > 0; i--) {
    if (searchVal === array[i]) return i;
  }

  return -1;
};

logHelper("indexOf", [1, 2, 3, 4, 5, 3], (array) =>
  Array.prototype.myLastFindIndex(array, 3)
);

logHelper("indexOf", [1, 2, 3, 4, 5, 3], (array) =>
  Array.prototype.myLastFindIndex(array, 3, -2)
);
