/** 节点类 */
class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

/** N叉树类 */
class NaryTree {
  constructor(arr = []) {
    this.root = this.buildTree(arr); // 在构造函数中直接创建树
  }

  /**
   * 根据数组构建N叉树（层序构建）
   * LeetCode 样例输入格式，例如 [1,null,3,2,4,null,5,6]
   * 第一个null后面是根节点的子节点，每个null分隔不同节点的子节点
   */
  buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 2; // 跳过根节点和第一个null

    while (queue.length > 0 && i <= arr.length) {
      const current = queue.shift();

      // 为当前节点添加所有子节点，直到遇到null或数组结束
      while (i < arr.length && arr[i] !== null) {
        const child = new TreeNode(arr[i]);
        current.children.push(child);
        queue.push(child);
        // 这里i++，是因为while循环中，i是用来判断数组是否结束的，所以需要先++，再判断
        i++;
      }

      // 跳过null分隔符
      i++;
    }

    return root;
  }
}
