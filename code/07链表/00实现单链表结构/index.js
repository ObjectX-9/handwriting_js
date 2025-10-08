class LinkedList {
  head = null;
  length = 0;

  // 通过数组创建链表（重置后构建）
  buildLinkedListByArr(arr) {
    // ✅ 重要：先重置链表
    this.head = null;
    this.length = 0;

    console.log("✅ ~ arr:", arr);
    arr.forEach((item) => {
      this.append(item);
    });
    return this.head;
  }

  // 通过数组追加到现有链表（保留原有功能）
  appendFromArray(arr) {
    arr.forEach((item) => {
      this.append(item);
    });
    return this.head;
  }

  printList(root) {
    let current = root;
    let listString = "";
    while (current) {
      listString += "," + current.elem;
      current = current.next;
    }
    return listString.slice(1);
  }

  // 详细打印链表结构（用于调试）
  printDetailedList() {
    console.log("=== 详细链表结构 ===");
    console.log("head:", this.head);
    console.log("length:", this.length);

    let current = this.head;
    let index = 0;
    while (current) {
      console.log(`节点${index}:`, {
        elem: current.elem,
        next: current.next ? `Node(elem: ${current.next.elem})` : null,
      });
      current = current.next;
      index++;
    }
    console.log("=== 结构结束 ===");
  }

  // 队尾增加方法
  append(elem) {
    // 新建节点
    const newNode = new Node(elem);
    // 判断是否为空链表
    if (this.head === null) {
      this.head = newNode;
    } else {
      // 找到最后一个节点的位置
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // 任意位置增加: 需要两个指针一个计数器
  insert(position, element) {
    if (position < 0 || position > this.length) return false;
    const newNode = new Node(element);
    let current = this.head;
    let preview = null;
    // 计数器
    let index = 0;
    if (position === 0) {
      newNode.next = current;
      this.head = newNode;
    } else {
      // 查找节点位置
      while (index++ < position) {
        preview = current;
        current = current.next;
      }
      // 插入节点
      preview.next = newNode;
      newNode.next = current;
    }
    this.length++;
    return true;
  }

  // 任意位置删除: 需要两个指针一个计数器
  removeAt(position) {
    // 下标从0开始
    if (position < 0 || position >= this.length) return null;

    let current = this.head;
    let previous = null;
    let index = 0;
    if (position === 0) {
      this.head = current.next;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.length--;
    return current.elem;
  }

  // 获取元素位置: 需要一个计数器，从头结点开始找
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
  remove(elem) {
    const index = this.indexOf(elem);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getFirst() {
    return this.head.elem;
  }

  toString() {
    let current = this.head;
    let listString = "";
    while (current) {
      listString += "," + current.elem;
      current = current.next;
    }
    return listString.slice(1);
  }
}

class Node {
  elem;
  next;
  constructor(elem, next = null) {
    this.elem = elem;
    this.next = next;
  }
}

// // 测试修正后的 buildLinkedListByArr 方法
// console.log("=== 测试 buildLinkedListByArr 修正 ===");
// const testList = new LinkedList();

// // 先添加一些数据
// testList.append(100);
// testList.append(200);
// console.log("初始链表:", testList.toString());

// // 使用 buildLinkedListByArr（应该重置）
// testList.buildLinkedListByArr([1, 2, 3]);
// console.log("buildLinkedListByArr后:", testList.toString()); // 期望：1,2,3

// // 使用 appendFromArray（应该追加）
// testList.appendFromArray([4, 5]);
// console.log("appendFromArray后:", testList.toString()); // 期望：1,2,3,4,5

// // 🔍 详细查看链表结构
// testList.printDetailedList();

// // 🔍 直接暴露head供控制台查看
// window.debugHead = testList.head;
// console.log("已将head暴露为 window.debugHead，可在控制台输入 debugHead 查看");

// // 测试链表
// // 1.创建链表
// const list = new LinkedList();

// // 2.追加元素
// list.append(15);
// list.append(10);
// list.append(20);
// console.log(list.toString());

// list.insert(0, 100);
// list.insert(4, 200);
// list.insert(2, 300);

// // 3.打印链表的结果
// console.log(list.toString());

// // 5.测试removeAt方法
// list.removeAt(0);
// list.removeAt(1);
// list.removeAt(3);

// // 3.打印链表的结果
// console.log(list.toString());

// // 6.测试indexOf方法
// console.log("✅ ~ list.indexOf(15):", list.indexOf(15)); // 0
// console.log("✅ ~ list.indexOf(10) :", list.indexOf(10)); // 1
// console.log("✅ ~ list.indexOf(20):", list.indexOf(20)); // 2
// console.log("✅ ~ list.indexOf(100):", list.indexOf(100)); // -1

// list.remove(15);
// // 3.打印链表的结果
// console.log(list.toString());

// console.log("✅ ~ list.isEmpty():", list.isEmpty());
// console.log("✅ ~ list.size():", list.size());
// console.log("✅ ~ list.getFirst():", list.getFirst());
