const arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flatten(arr) {
  return arr.reduce((res, next) => {
    console.log("✅ ~ res:", res);
    console.log("✅ ~ next:", next);
    return res.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

console.log("✅ ~ flatten:", flatten(arr1));
