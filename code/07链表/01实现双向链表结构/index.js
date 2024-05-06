class DbLinkedList {
  length = 0;
  head = null;
  tail = null;

  append(elem) {
    const newNode = new MyNode(elem);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 连接节点
      this.tail.next = newNode;
      // 处理pre指针
      newNode.pre = this.tail;
      // 将tail移动到新增的节点
      this.tail = newNode;
      // 置空next
      this.tail.next = null;
    }
    this.length++;
  }

  // 正向遍历转成字符串的方法
  forwardString() {
    let current = this.head;
    let resultStr = "";
    while (current) {
      resultStr += "," + current.elem;
      current = current.next;
    }
    return resultStr.slice(1);
  }
  // 反向遍历转成字符串的方法
  reverseString() {
    let current = this.tail;
    let resultStr = "";
    while (current) {
      resultStr += "," + current.elem;
      current = current.pre;
    }
    return resultStr.slice(1);
  }
  // 正向遍历转成字符串的方法
  toString() {
    this.forwardString();
  }

  // 任意位置插入
  insert(position, element) {
    if (position < 0 || position > this.length) return false;
    const newNode = new MyNode(element);

    if (position === 0) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        // 连接新节点
        this.head.pre = newNode;
        newNode.next = this.head;
        // 移动头指针到新节点
        this.head = newNode;
      }
    } else if (position === this.length) {
      // 连接节点
      this.tail.next = newNode;
      newNode.pre = this.tail;
      // 移动指针tail到新节点
      this.tail = newNode;
    } else {
      let index = 0;
      let current = this.head;
      let preview = null;

      while (index++ < position) {
        preview = current;
        current = current.next;
      }

      // 连接前面两个指针
      current.pre.next = newNode;
      newNode.pre = current.pre;

      // 连接后面两个指针
      newNode.next = current;
      current.pre = newNode;
    }
    this.length++;
    return true;
  }

  //任意位置移除
  removeAt(position) {
    if (position < 0 || position >= this.length || this.length === 0)
      return null;

    let current = this.head;
    if (position === 0) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        // 先移动指针到下一个为止
        this.head = this.head.next;
        // 断开前一个的指针
        this.head.pre.next = null;
        this.head.pre = null;
      }
    } else if (position === this.length - 1) {
      current = this.tail;
      // 先断开前一个指针的next，这样还可以通过pre找到
      this.tail.pre.next = null;
      // 移动到前一个
      this.tail = this.tail.pre;
      // 断开next
      this.tail.next = null;
    } else {
      let index = 0;
      let previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 断开current
      current.pre.next = current.next;
      current.next.pre = current.pre;
    }
    this.length--;
    return current.elem;
  }

  // 获取元素位置
  indexOf(elem) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.elem === elem) return index;
      index++;
      current = current.next;
    }
    return -1;
  }

  // 根据元素删除
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 判断是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 获取链表长度
  size() {
    return this.length;
  }

  // 获取第一个元素
  getHead() {
    return this.head.elem;
  }

  // 获取最后一个元素
  getTail() {
    return this.tail.elem;
  }
}

class MyNode {
  elem;
  pre;
  next;
  constructor(elem) {
    this.elem = elem;
    this.pre = null;
    this.next = null;
  }
}

// 1.创建双向链表对象
const DBLink = new DbLinkedList();

// 2.追加元素
DBLink.append("abc");
DBLink.append("cba");
DBLink.append("nba");
DBLink.append("mba");

// 3.获取所有的遍历结果
// console.log("✅ ~ DBLink.forwardString():", DBLink.forwardString());
// console.log("✅ ~ DBLink.reverseString():", DBLink.reverseString());
// console.log("✅ ~ DBLink:", DBLink);

// 4.insert方法测试
DBLink.insert(0, "100");
DBLink.insert(2, "200");
DBLink.insert(6, "300");
console.log("✅ ~ DBLink.forwardString():", DBLink.forwardString());

// 5.removeAt方法测试
console.log("✅ ~ DBLink.removeAt(0):", DBLink.removeAt(0));
console.log("✅ ~ DBLink.removeAt(1):", DBLink.removeAt(1));
console.log("✅ ~ DBLink.removeAt(4):", DBLink.removeAt(4));
