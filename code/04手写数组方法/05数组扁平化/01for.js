// let a = [1, [2, 3, [4, 5]]];
// a.flat();
// console.log("✅ ~ a.flat():", a.flat());
// console.log("✅ ~ a.flat():", a.flat(Infinity));

const arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

function myFlat(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      //   result = result.concat(myFlat(array[i]));
      result = [...result, ...myFlat(array[i])];
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

myFlat(arr1);
console.log("✅ ~ myFlat(arr1):", myFlat(arr1));
