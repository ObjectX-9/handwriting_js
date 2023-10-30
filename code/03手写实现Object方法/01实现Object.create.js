function objectCreate(proto) {
  function Func() {
    this.name = "zhuling";
  }
  const newObject = new Func();
  newObject.prototype = proto;
  return newObject;
}

const obj1 = { age: 25 };

const obj2 = objectCreate(obj1);
console.log("✅ ~ obj2:", obj2, obj2.age);
