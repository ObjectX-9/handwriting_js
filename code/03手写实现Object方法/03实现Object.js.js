const is = (x, y) => {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
};

console.log("✅ ~ return: is(+0, -0)", is(+0, -0));
console.log("✅ ~ return: is(+0, 0)", is(+0, 0));
console.log("✅ ~ return: is(-0, 0)", is(-0, 0));
console.log("✅ ~ return: is(NaN, NaN)", is(NaN, NaN));
console.log("✅ ~ return: is(100, 99)", is(100, 99));
console.log("✅ ~ return: is('', 99)", is("", 99));
