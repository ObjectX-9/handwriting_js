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
