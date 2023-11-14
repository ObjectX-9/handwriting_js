const arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
const arr2 = [1, 2, [3]];
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    // 多个值连起来，如果是值，直接放进去，数组，拆开
    arr = [].concat(...arr);
    console.log("✅ ~ arr:", arr);
    //arr = Array.prototype.concat.apply([],arr);
  }
  return arr;
}
flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
console.log("✅ ~ flatten(arr1):", flatten(arr1));
