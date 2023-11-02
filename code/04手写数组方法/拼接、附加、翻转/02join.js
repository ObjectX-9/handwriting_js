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

function myJoin1(array, seperate) {
  let result = "";
  seperate = seperate === undefined ? "," : seperate;
  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      result = `${array[i]}`;
    }
    result = `${result}${seperate}${array[i]}`;
  }
  return result;
}

function myJoin2(array, seperate) {
  seperate = seperate === undefined ? "," : seperate;
  const result = array.reduce((acc, i, index) => {
    console.log("✅ ~ index:", index);
    if (index === 0) {
      return `${i}`;
    }
    return `${acc}${seperate}${i}`;
  });
  return result;
}

logHelper("join", [1, 2, 3, 4, 5], (array) => myJoin1(array, ","));

logHelper("join", [1, 2, 3, 4, 5], (array) => myJoin2(array, ", "));
