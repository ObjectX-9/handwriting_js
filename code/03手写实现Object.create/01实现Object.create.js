function objectCreate(proto) {
  function Func() {
    this.name = "zhuling";
  }
  Func.prototype = proto;
  return new Func();
}

const obj1 = { age: 25 };

const obj2 = objectCreate(obj1);
console.log("✅ ~ obj2:", obj2, obj2.age);
