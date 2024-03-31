class Node {
  key;
  left;
  right;
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  root;
  constructor() {
    this.root = null;
  }
  // 插入节点
  insert(key) {
    // 1.创建节点
    const newNode = new Node(key);
    // 2.如果树是空的，将节点设为根节点
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * 插入节点[递归]
   * @param {*} node 被比较的节点
   * @param {*} newNode 插入的节点
   */
  insertNode(root, newNode) {
    // 向左查找
    if (newNode.key < root.key) {
      // 1.左子节点为null
      if (root.left === null) {
        root.left = newNode;
      }
      // 2.左子节点不为空
      else {
        this.insertNode(root.left, newNode);
      }
    } else {
      // 向右查找
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  /**
   * 先序遍历二叉树[递归]
   * @param {*} handler 执行的handle，打印或是其他操作
   */
  preOrderTraversal(handler) {
    this.preOrderTranversalNode(this.root, handler);
  }

  preOrderTranversalNode(root, handler) {
    if (root !== null) {
      // 1.打印节点, 根节点
      handler(root.key);
      // 2.遍历左子树
      this.preOrderTranversalNode(root.left, handler);
      // 3.遍历右子树
      this.preOrderTranversalNode(root.right, handler);
    }
  }

  // 中序遍历[递归]
  inOrderTraversal(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }

  inOrderTraversalNode(root, handler) {
    if (root !== null) {
      // 1.遍历左节点
      this.inOrderTraversalNode(root.left, handler);
      // 2.遍历根节点
      handler(root.key);
      // 3.遍历右节点
      this.inOrderTraversalNode(root.right, handler);
    }
  }

  // 后续遍历[递归]
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }

  postOrderTraversalNode(root, handler) {
    if (root !== null) {
      // 1.遍历左节点
      this.postOrderTraversalNode(root.left, handler);
      // 2.遍历右节点
      this.postOrderTraversalNode(root.right, handler);
      // 3.遍历根节点
      handler(root.key);
    }
  }

  // 获取最小值
  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  // 获取最大值
  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  // 搜索指定值[递归]
  searchElem(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(root, key) {
    // 1.根节点为空，找不到
    if (root === null) {
      return false;
    }
    // key较小，查左子树
    if (root.key > key) {
      return this.searchNode(root.left, key);
    } else if (root.key < key) {
      // key较大，查右子树
      return this.searchNode(root.right, key);
    } else {
      return true;
    }
  }

  // 非递归查找方法
  nonRecursiveSearch(key) {
    let node = this.root;
    while (node !== null) {
      if (node.key > key) {
        node = node.left;
      } else if (node.key < key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    // 1.查找要删除的节点
    let current = this.root;
    let parent = null;
    let isLeftChild = true;
    // 不等于传入的就循环
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }

      // 没找到相等的节点
      if (current === null) return false;
    }

    // 2.根据情况删除节点
    // 2.1删除的是叶子节点
    if (current.left === null && current.right === null) {
      // 只有一个根节点
      if (current === root) {
        this.root = null;
      }
      // 删除的是一个叶子节点，删除的是左子节点，还是右子节点
      else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // 2.2删除的是有一个子节点的节点
    // 2.2.1 右节点为null
    else if (current.right === null) {
      // 如果是根节点带有一个节点
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      // 2.2.2 左节点为null
      // 如果是根节点带有一个节点
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }
    // 删除的是有两个节点的节点
    else {
      let successer = this.getSuccessor(current);
      // 判断是否是根节点
      if (current === this.root) {
        this.root = successer;
      } else if (isLeftChild) {
        parent.left = successer;
      } else {
        parent.right = successer;
      }

      successer.left = current.left;
    }
    return true;
  }

  /**
   * 找后继，记得考虑找到的后继节点有右节点的情况，他不可能有左节点，因为左节点又会找下去，后继就是它了
   * @param {*} delNode
   * @returns
   */
  getSuccessor(delNode) {
    let successorParent = delNode;
    // 因为是从右侧找后继
    let successer = delNode;
    let current = delNode.right;

    // 寻找节点
    while (current !== null) {
      successorParent = successer;
      successer = current;
      current = current.left;
    }

    // ！！！重点：如果后继节点不是删除节点的右节点
    if (successer !== delNode.right) {
      successorParent.left = successer.right;
      successer.right = delNode.right;
    }

    return successer;
  }
}

// 测试代码
const bst = new BinarySearchTree();

// 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// 测试前序遍历结果
let resultString = "";
bst.preOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("测试前序遍历结果", resultString); // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

// 测试中序遍历结果
resultString = "";
bst.inOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("测试中序遍历结果", resultString); // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

// 测试后续遍历结果
resultString = "";
bst.postOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("测试后序遍历结果", resultString); // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

// 获取最值
console.log("测试最小值结果", bst.min()); // 3
console.log("测试最大值历结果", bst.max()); // 25

// 查找值
console.log("测试查找10结果", bst.searchElem(10)); // true
console.log("测试查找99历结果", bst.searchElem(99)); // false

console.log("测试查找10结果", bst.nonRecursiveSearch(10)); // true
console.log("测试查找99历结果", bst.nonRecursiveSearch(99)); // false
