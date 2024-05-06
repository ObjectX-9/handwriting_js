/** 节点类：保存节点信息和指针 */
class Node {
  left;
  right;
  key;
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

/** 二叉搜索树 */
class BinarySearchTree {
  root;
  constructor(key) {
    this.root = null;
  }

  /**
   * 插入节点
   * @param {*} key
   */
  insert(key) {
    const newNode = new Node(key);
    // 如果根节点为空
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * 插入节点的方法
   * @param {*} root
   * @param {*} newNode
   */
  insertNode(root, newNode) {
    // 如果已经有了，则禁止插入
    if (root.key === newNode.key) {
      console.log("======>该节点已经插入过了");
    } else if (root.key > newNode.key) {
      // 左侧查找
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      // 右侧查找
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  /**
   * 先序遍历
   * @param {*} root
   * @param {*} handler
   */
  preOrderTraversal(handler) {
    this.preOrderTranversalNode(this.root, handler);
  }

  preOrderTranversalNode(root, handler) {
    // 边界判断
    if (!root) return;
    // 访问根节点
    handler(root.key);
    // 访问左子树
    this.preOrderTranversalNode(root.left, handler);
    // 访问右子树
    this.preOrderTranversalNode(root.right, handler);
  }

  /**
   * 中序遍历
   * @param {*} handler
   */
  inOrderTraversal(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }

  inOrderTraversalNode(root, handler) {
    if (!root) return;
    this.inOrderTraversalNode(root.left, handler);
    handler(root.key);
    this.inOrderTraversalNode(root.right, handler);
  }

  /**
   * 后序遍历
   * @param {*} handler
   */
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }

  postOrderTraversalNode(root, handler) {
    if (!root) return;
    this.postOrderTraversalNode(root.left, handler);
    this.postOrderTraversalNode(root.right, handler);
    handler(root.key);
  }

  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  // 递归的方式
  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(root, key) {
    if (!root) return false;
    if (root.key < key) {
      return this.searchNode(root.right, key);
    } else if (root.key > key) {
      return this.searchNode(root.left, key);
    } else {
      return true;
    }
  }

  // 非递归的方式
  searchV2(key) {
    return this.searchNodeV2(this.root, key);
  }

  searchNodeV2(root, key) {
    if (!root) return false;
    while (root !== null) {
      if (root.key < key) {
        root = root.right;
      } else if (root.key > key) {
        root = root.left;
      } else {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    // 当前遍历到的节点
    let current = this.root;
    // 当前节点的父级节点，因为需要更改父级指针
    let parent = this.root;
    // 记录是父级节点的左子节点还是右子节点
    let isLeftChild = false;
    // 查找需要删除的节点
    while (current.key !== key) {
      parent = current;
      // 左子树查找
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        // 右子树查找
        isLeftChild = false;
        current = current.right;
      }

      if (current === null) return false;
    }
    // 1.第一种情况，删除的是叶节点，考虑是否为根元素和非根元素两种情况
    // 如果是根元素直接删除，如果不是根则根据isLeftChild，将parent的left||right置为null
    if (current.left === null && current.right === null) {
      // 只有一个根元素
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // 2.第二种情况，当前遍历到的节点有一个子节点，考虑current是否为根和非根两种情况
    // 左子树不为null，current只有左子树，这里赋值的都是current.left;
    else if (current.right === null) {
      if (current === this.root) {
        // 这里是因为右子树为null
        this.root = current.left;
      } else if (isLeftChild) {
        // 注意isLeftChild是用来决定使用的是parent的哪个指针
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      // 右子树不为null，current只有左子树，这里赋值的都是current.left;
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    // 3.第三种情况，左右子树都有，这时候需要考虑使用查找前驱、后继节点来替换删除的节点
    // 前驱：比current小一点点的节点, 称为current节点的前驱.
    // 后继：比current大一点点的节点, 称为current节点的后继.
    else {
      // 1.获取后继节点
      let successor = this.getSuccessor(current);

      // 2.判断是否是根节点
      if (current == this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      // 3.将删除节点的左子树赋值给successor
      successor.left = current.left;
    }
    return true;
  }

  getSuccessor(delNode) {
    let parent = delNode;
    let target = delNode;
    // 从右子树开始
    let current = delNode.right;
    // 查找后继，左子树最小节点
    while (current !== null) {
      parent = target;
      target = current;
      current = current.left;
    }

    // 对于跨域层级的删除
    if (target != delNode.right) {
      parent.left = target.right;
      target.right = delNode.right;
    }

    return target;
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
console.log("✅ ~ 先序遍历resultString:", resultString); // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

resultString = "";
bst.inOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("✅ ~ 中序遍历resultString:", resultString); // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

resultString = "";
bst.postOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("✅ ~ 后序遍历resultString:", resultString); // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

// 获取最值
console.log("✅ ~ bst.min():", bst.min());
console.log("✅ ~ bst.max():", bst.max());

// 查找特定的值
console.log("✅ ~ bst.search(10):", bst.search(10));
console.log("✅ ~ bst.search(21):", bst.search(21));

// 查找特定的值
console.log("✅ ~ bst.searchV2(10):", bst.searchV2(10));
console.log("✅ ~ bst.searchV2(21):", bst.searchV2(21));

// 删除测试
console.log("✅ ~ bst.searchV2(10):", bst.remove(7));
resultString = "";
bst.postOrderTraversal(function (key) {
  resultString += key + " ";
});
console.log("✅ ~ 后序遍历resultString:", resultString); // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
