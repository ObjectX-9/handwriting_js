class Dictionary {
  items = {};

  set(key, value) {
    this.items[key] = value;
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.items, key);
  }

  remove(key) {
    if (!this.has(key)) return false;
    delete this.items[key];
    return true;
  }

  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  keys() {
    return Object.keys(this.items);
  }

  values() {
    return Object.values(this.items);
  }

  size() {
    return this.keys().length;
  }

  clear() {
    this.items = {};
  }
}

// 创建字典对象
const dict = new Dictionary();

// 在字典中添加元素
dict.set("age", 18);
dict.set("name", "Coderwhy");
dict.set("height", 1.88);
dict.set("address", "广州市");

// 获取字典的信息
console.log(dict.keys()); // age,name,height,address
console.log(dict.values()); // 18,Coderwhy,1.88,广州市
console.log(dict.size()); // 4
console.log(dict.get("name")); // Coderwhy

// 字典的删除方法
dict.remove("height");
console.log(dict.keys()); // age,name,address

// 清空字典
dict.clear();
