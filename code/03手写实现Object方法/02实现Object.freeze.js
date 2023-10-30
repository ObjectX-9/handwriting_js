function myFreeze(obj) {
  if (obj instanceof Object) {
    Object.seal(obj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false,
        });
      }
      myFreeze(obj[key]);
    }
  }
}
const obj1 = {
  a: 100,
};

myFreeze(obj1);

obj1.a = 10000;

delete obj1.a;
console.log("✅ ~ obj1.a:", obj1.a);
