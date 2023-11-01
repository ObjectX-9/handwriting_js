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

Array.prototype.myFind1 = function (array, callback) {
  if (array.length === 0) return;
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
};

Array.prototype.myFind2 = function (array, callback) {
  const index = Array.prototype.findIndex.call(array, callback);
  if (index === -1) return undefined;
  return array[index];
};

logHelper("find1", [1, 2, 3, 4, 5], (array) =>
  Array.prototype.myFind1(array, (number) => number === 3)
);

logHelper("find2", [1, 2, 3, 4, 5], (array) =>
  Array.prototype.myFind2(array, (number) => number === 3)
);
