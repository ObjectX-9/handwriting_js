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

Array.prototype.myIncludes = function (array, searchVal, startIndex) {
  let start = startIndex === undefined ? 0 : startIndex;
  if (start < 0) {
    start = array.length + startIndex;
    if (start < 0) {
      start = 0;
    }
  }

  for (let i = start; i < array.length; i++) {
    if (array[i] === searchVal) {
      return true;
    }
  }
  return false;
};

logHelper("includes", [1, 2, 3, 4, 5], (array) =>
  Array.prototype.myIncludes(array, 5)
);

logHelper("includes", [1, 2, 3, 4, 5], (array) =>
  Array.prototype.myIncludes(array, 5, -1)
);

logHelper("includes", [1, 2, 3, 4], (array) =>
  Array.prototype.myIncludes(array, 5, -1)
);
