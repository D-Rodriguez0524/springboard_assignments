/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // tree is empty
    if (!this.root) return 0;

    let sum = 0;

    // initialize stack with root node
    const stack = [this.root];

    while (stack.length) {
      let currNode = stack.pop()

      // add node val being popped off stack to current sum
      sum += currNode.val;

      // push child nodes to stack
      for (let child of currNode.children) {
        stack.push(child);
      }
    }

    // return total sum
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    // tree is empty
    if (!this.root) return 0;

    let count = 0;

    // initialize stack with root node
    const stack = [this.root];

    while (stack.length) {
      let currNode = stack.pop();

      // increment count if node being popped off stack has an even value
      if (currNode.val % 2 === 0) count++;

      // push child nodes to stack
      for (let child of currNode.children) {
        stack.push(child);
      }
    }

    // return total count
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    // tree is empty
    if (!this.root) return 0;

    let count = 0;

    // initialize stack with root node
    const stack = [this.root];

    while (stack.length) {
      let currNode = stack.pop();

      // increment count if node being popped off stack has a value > lowerBound
      if (currNode.val > lowerBound) count++;

      // push child nodes to stack
      for (let child of currNode.children) {
        stack.push(child);
      }
    }

    // return total count
    return count;
  }
}

module.exports = { Tree, TreeNode };