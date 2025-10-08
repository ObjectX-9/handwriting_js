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

/**
 *
 * @param {*} array
 * @param {*} startIndex 开始索引
 * @param {*} removeElemNum 移除数量
 * @param  {...any} values 增加数量
 */
function mySplice(array, startIndex, removeElemNum, ...values) {
  // 第一段：索引之前无需处理
  const firstPart = array.slice(0, startIndex);
  // 第二段：最后一个删除元素之后的无需处理
  const secondPart = array.slice(startIndex + removeElemNum);
  // 第三段：删除元素
  const removedElements = array.slice(startIndex, startIndex + removeElemNum);
  // 第四段：插入元素
  const joinPart = firstPart.concat(values, secondPart);

  for (let index = 0; index < joinPart.length; index += 1) {
    array[index] = joinPart[index];
  }

  array.length = joinPart.length;
  console.log("✅ ~ removedElements:", removedElements);
  // 无返回值
}

logHelper("splice", [1, 2, 3, 4, 5], (array) => mySplice(array, 1, 3));
