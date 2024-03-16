class MyHashMap {
  //存数据
  storage = [];
  //计数器，计算转载因子
  count = 0;
  //哈希表的总长度
  limit = 7;
  /**
   * 设计hash函数
   * 1.将字符串转为大数字，hashCode
   * 2.将大数字hashCode压缩大数组范围(大小)之内：哈希化
   */
  myHashFunc(str, arrSize) {
    // 1.定义hashCode变量
    let hashCode = 0;
    // 2.霍纳算法(秦九昭算法)计算hashCode
    // cats -> unicode编码
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
      //   console.log("✅ ~ hashCode:", hashCode);
    }
    // 3.取余
    let index = hashCode % arrSize;
    return index;
  }

  /**
   * 插入数据
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    const index = this.myHashFunc(key, this.limit);
    let bucket = this.storage[index];
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }
    let override = false;
    // 修改
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        override = true;
      }
    }
    // 新增
    if (!override) {
      bucket.push([key, value]);
      this.count++;
      // 数组扩容
      if (this.count > this.limit * 0.75) {
        const limit = this.getPrime(this.limit * 2);
        this.resize(limit);
      }
    }
  }

  /**
   * 获取元素
   * @param {*} key
   */
  get(key) {
    const index = this.myHashFunc(key, this.limit);

    const bucket = this.storage[index];

    // 没有元素
    if (!bucket) {
      return null;
    }

    // 有元素，查找元素
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }

    return null;
  }

  /**
   * 删除元素
   * @param {*} key
   */
  remove(key) {
    const index = this.myHashFunc(key, this.limit);

    const bucket = this.storage[index];

    if (!bucket) return null;

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;

        // 缩小数组的容量，为什么是8，设置容量的最小值
        if (this.limit > 8 && this.count < this.limit * 0.25) {
          const limit = this.getPrime(Math.floor(this.limit / 2));
          this.resize(limit);
        }
        return tuple[1];
      }
    }

    return null;
  }

  /**
   * 扩容哈希表
   * @param {*} newLimit
   */
  resize(newLimit) {
    const oldStorage = this.storage;

    this.limit = newLimit;
    this.count = 0;
    this.storage = [];

    oldStorage.forEach((bucket) => {
      if (!bucket) return null;

      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.size;
  }

  // 判断是否是质数
  isPrime = function (num) {
    var temp = parseInt(Math.sqrt(num));
    // 2.循环判断
    for (var i = 2; i <= temp; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  };

  // 获取质数
  getPrime = function (num) {
    while (!isPrime(num)) {
      num++;
    }
    return num;
  };
}

const myHashMap = new MyHashMap();
// 测试哈希表

// 2.插入数据
myHashMap.put("abc", "123");
myHashMap.put("cba", "321");
myHashMap.put("nba", "521");
myHashMap.put("mba", "520");

// 3.获取数据
console.log(myHashMap.get("abc"));
myHashMap.put("abc", "111");
console.log(myHashMap.get("abc"));

// 4.删除数据
console.log(myHashMap.remove("abc"));
console.log(myHashMap.get("abc"));
