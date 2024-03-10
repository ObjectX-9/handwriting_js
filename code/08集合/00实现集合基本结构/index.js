class MySet {
  items = {};
  has(value) {
    return Object.prototype.hasOwnProperty.call(this.items, value);
  }

  add(value) {
    if (this.has(value)) return false;
    this.items[value] = value;
    return true;
  }

  remove(value) {
    if (!this.has(value)) return false;
    delete this.items[value];
    return true;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    // 这里是因为item[value] = value;
    return Object.keys(this.items);
  }
}

// 测试和使用集合类
const set = new MySet();

// 添加元素
set.add(1);
console.log(set.values());
set.add(1);
console.log(set.values());

set.add(100);
set.add(200);
console.log(set.values());

// 判断是否包含元素
console.log(set.has(100)); // true

// 删除元素
set.remove(100);
console.log(set.values()); // 1, 200

// 获取集合的大小
console.log(set.size()); // 2
set.clear();
console.log(set.size()); // 0
