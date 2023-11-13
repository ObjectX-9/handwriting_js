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

function myReverse1(array) {
  let result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result[array.length - 1 - i] = array[i];
  }
  return result;
}

function myReverse2(array) {
  let arrayLength = array.length - 1;
  let mid = Math.floor(arrayLength / 2);
  console.log("✅ ~ mid:", mid);
  let temp;
  for (let i = 0; i <= mid; i++) {
    temp = array[i];
    array[i] = array[arrayLength - i];
    array[arrayLength - i] = temp;
  }
  return array;
}

logHelper("reverse", [1, 2, 3, 4, 5], (array) => myReverse1(array));
logHelper("reverse", [1, 2, 3, 4, 5], (array) => myReverse2(array));
