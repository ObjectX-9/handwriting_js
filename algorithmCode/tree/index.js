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

  // =========================创建===============================
  // (递归-先序)先序创建二叉树的函数: 根左右,每一颗子树都是一样的递归创建，顺序是排好的
  preCreateBinaryTree(preOrder) {
    let index = 0;
    function buildTree() {
      const value = preOrder[index++];

      if (value === '#' || value === undefined) {
        return null;
      }
      // 根左右
      const newNode = new Node(parseInt(value));
      newNode.left = buildTree();
      newNode.right = buildTree();

      return newNode;
    }

    return buildTree();
  }

  // (非递归-先序): 用栈模拟递归的过程
  noRePreCreateBinaryTree(preOrder) {
    // 数组长度为0
    if (!preOrder || preOrder.length === 0) {
      return null;
    }

    // 创建根节点并将其推入栈中
    const root = new Node(parseInt(preOrder[0]));
    const stack = [];
    stack.push(root);
    let index = 1;
    let currentNode = root;

    while (index < preOrder.length) {
      // 当前值不是 '#'，创建新节点并连接到当前节点的左/右子树
      if (preOrder[index] !== '#') { 
        const newNode = new Node(parseInt(preOrder[index]));
        // 如果当前节点的左孩子为空，将新节点作为当前节点的左孩子
        if (!currentNode.left) {
          currentNode.left = newNode;
        } else {
          currentNode.right = newNode;
        }
        // 将新节点推入栈中
        stack.push(newNode); 
        // 更新当前节点为新节点，继续向下处理
        currentNode = newNode; 
      } else { 
        // 当前值为 '#'，说明当前节点的子节点为空
        if (!currentNode.left) {
          currentNode.left = null; // 将左子节点设为 null
        } else {
          currentNode.right = null; // 将右子节点设为 null
        }
        // 找到最近一个非空节点，即栈中最后一个节点
        while (preOrder[index] === '#' && stack.length > 0) {
          currentNode = stack.pop(); // 弹出栈顶节点
        }
        index--; // 因为要处理当前为 '#' 的节点，所以需要回退一个位置
      }
      index++;
    }
    return root; // 返回根节点
  }












  // (递归)先序遍历输出
  preOrderPrintf(node) {
    if (node === null) {
      return;
    }
    console.log(node.data);
    this.preOrderPrintf(node.left);
    this.preOrderPrintf(node.right);
  }

  // 非递归先序创建二叉树

}

// 非递归先序创建
const preorderTraversal = ['1', '2', '4', '#', '#', '#', '3', '5', '#', '#', '6', '#', '#'];
const preTree = new BinarySerachTree();

// const preOrderNode = preTree.preCreateBinaryTree(preorderTraversal)
// console.log("✅ ~ zhuling （递归）preOrderNode,先序序列创建的树", preOrderNode)
// console.log("✅ ~ zhuling （递归）preOrderTraversalCheck:", preTree.preOrderPrintf(preOrderNode))



const nRePreOrderNode = preTree.noRePreCreateBinaryTree(preorderTraversal);

console.log("✅ ~ zhuling （非递归）nRePreOrderNode:", nRePreOrderNode)
console.log("✅ ~ zhuling （非递归）preOrderTraversalCheck:", preTree.preOrderPrintf(nRePreOrderNode))




