// 定义节点结构
class Node {
  constructor(data) {
    // 节点值
    this.data = data;
    // 左子树
    this.left = null;
    // 右子树
    this.right = null;
  }
}

class BinarySerachTree {
  constructor() {
    this.root = null;
  }

  // 先序创建二叉树的函数: 根左右
  preCreateBinaryTree(preOrder) {
    if (preOrder.length === 0) return;
    const root = new Node(preOrder[0]);

    const left = [];
    const right = [];

    // 左子树都比根节点小
    for (let i = 1; i < preOrder.length; i++) { 
      if (preOrder[i] < root.data) {
        left.push(preOrder[i]);
      }
    }
    root.left = this.preCreateBinaryTree(left);
    // 右子树都比根节点大
    for (let i = 1; i < preOrder.length; i++) { 
      if (preOrder[i] > root.data) {
        right.push(preOrder[i]);
      }
    }
    root.right = this.preCreateBinaryTree(right);
    return root;
  }
}
const preOrder = [6, 4, 3, 5, 9, 10, 11];
const preTree = new BinarySerachTree();
preTree.preCreateBinaryTree(preOrder);
console.log("✅ ~ zhuling preTree.preCreateBinaryTree(preOrder)", preTree.preCreateBinaryTree([6,4,3,5,9,10,11]))

// {
//   "data": 6,
//   "left": {
//     "data": 4,
//     "left": {
//       "data": 3,
//       "left": undefined,
//       "right": undefined
//     },
//     "right": {
//       "data": 5,
//       "left": undefined,
//       "right": undefined
//     }
//   },
//   "right": {
//     "data": 9,
//     "left": undefined,
//     "right": {
//       "data": 10,
//       "left": undefined,
//       "right": [
//         {
//           "data": 1,
//           "left": undefined,
//           "right": undefined
//         }
//       ]
//     }
//   }
// }