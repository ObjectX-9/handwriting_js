/**
 * 完美二叉树实现
 * 完美二叉树：除了最后一层外，每一层都被完全填满，且最后一层的叶子节点都在左侧
 */

// 定义树节点类
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.next = null;
  }
}

// 完美二叉树类
class PerfectBinaryTree {
  constructor(arr) {
    this.root = this.buildFromArray(arr);
  }

  /**
   * 从数组构建完美二叉树
   * @param {number[]} arr - 输入数组，按层序排列
   * @returns {TreeNode|null} - 返回根节点
   */
  buildFromArray(arr) {
    if (!arr || arr.length === 0) {
      return null;
    }

    this.root = new TreeNode(arr[0]);
    const queue = [this.root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
      const node = queue.shift();

      // 添加左子节点
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;

      // 添加右子节点
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }

    return this.root;
  }
}
