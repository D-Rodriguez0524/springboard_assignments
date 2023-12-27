/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // tree is empty
    if (!this.root) return 0;

    const DFS = (node) => {
      // no child nodes, depth is level of node itself
      if (node.left === null && node.right === null) return 1;

      // only right child node, increment current depth and continue to right child
      if (node.left === null) return DFS(node.right) + 1;

      // only left child node, increment current depth and continue to left child
      if (node.right === null) return DFS(node.left) + 1;

      // return the min depth between left subtree and right subtree
      return (Math.min(DFS(node.left), DFS(node.right)) + 1);
    }

    // initial dfs recursive call
    return DFS(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    // tree is empty
    if (!this.root) return 0;

    const DFS = (node) => {
      // no child nodes, depth is level of node itself
      if (node.left === null && node.right === null) return 1;

      // only right child node, increment current depth and continue to right child
      if (node.left === null) return DFS(node.right) + 1;

      // only left child node, increment current depth and continue to left child
      if (node.right === null) return DFS(node.left) + 1;

      // return the max depth between left subtree and right subtree
      return (Math.max(DFS(node.left), DFS(node.right)) + 1);
    }

    // initial dfs recursive call
    return DFS(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    // total sum
    let res = 0;

    const DFS = (node) => {
      // node is null
      if (node === null) return 0;

      // left subtree path
      const leftSubTree = DFS(node.left);
      // right subtree path
      const rightSubTree = DFS(node.right);

      // get max between current res and current path 
      res = Math.max(res, node.val + leftSubTree + rightSubTree);

      return Math.max(0, leftSubTree + node.val, rightSubTree + node.val);
    }

    // initial dfs recursive call
    DFS(this.root);

    return res;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // tree is empty
    if (this.root === null) return null;

    let res = null;

    const DFS = (node) => {
      // node is null
      if (!node) return;

      // traverse left subtree
      if (node.left) DFS(node.left);

      // traverse right subtree
      if (node.right) DFS(node.right);

      // update current min val (res)
      if (node.val > lowerBound && (node.val < res || res === null)) {
        res = node.val;
      }
    }

    // initial recursive call 
    DFS(this.root);

    return res;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };