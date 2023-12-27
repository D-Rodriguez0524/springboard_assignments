class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    let currentValue = this.root;
    while (true) {
      if (val < currentValue.val) {
        if (currentValue.left === null) {
          currentValue.left = new Node(val);
          return this;
        } else {
          currentValue = currentValue.left;
        }
      } else if (val > currentValue.val) {
        if (currentValue.right === null) {
          currentValue.right = new Node(val);
          return this;
        } else {
          currentValue = currentValue.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentValue = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    if (val < currentValue.val) {
      if (currentValue.left === null) {
        currentValue.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentValue.left);
    } else {
      if (currentValue.right === null) {
        currentValue.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentValue.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentValue = this.root;
    let foundValue = false;
    if (val === currentValue.val) {
      return currentValue;
    }
    while (currentValue && !foundValue) {
      if (val < currentValue.val) {
        currentValue = currentValue.left;
      } else if (val > currentValue.val) {
        currentValue = currentValue.right;
      } else {
        foundValue = true;
      }
    }
    if (!foundValue) {
      return undefined;
    }
    return currentValue;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentValue = this.root) {
    if (this.root === null) {
      return undefined;
    }
    if (val < currentValue.val) {
      if (currentValue.left === null) {
        return undefined;
      }
      return this.findRecursively(val, currentValue.left);
    } else if (val > currentValue.val) {
      if (currentValue.right === null) {
        return undefined;
      }
      return this.findRecursively(val, currentValue.right);
    }
    return currentValue;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const values = [];
    let currentValue = this.root;
    const solver = (node) => {
      values.push(node.val);
      node.left && solver(node.left);
      node.right && solver(node.right);
    };
    solver(currentValue);
    return values;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const values = [];
    let currentValue = this.root;
    const solver = (node) => {
      node.left && solver(node.left);
      values.push(node.val);
      node.right && solver(node.right);
    };
    solver(currentValue);
    return values;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const values = [];
    let currentValue = this.root;
    const solver = (node) => {
      node.left && solver(node.left);
      node.right && solver(node.right);
      values.push(node.val);
    };
    solver(currentValue);
    return values;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let currentValue = this.root;
    const count = [];
    const values = [];
    count.push(currentValue);
    while (count.length) {
      currentValue = count.shift();
      values.push(currentValue.val);
      if (currentValue.left) {
        count.push(currentValue.left);
      }
      if (currentValue.right) {
        count.push(currentValue.right);
      }
    }
    return values;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) { }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() { }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() { }
}

module.exports = BinarySearchTree;