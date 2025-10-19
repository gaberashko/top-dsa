import { Node } from "./Node.js";
import { LinkedList } from "./LinkedList.js";

class Tree {
    constructor(root = new Node()) {
        this.root = root;
    }

    // Takes an array of data and turns it into a balanced binary tree w/ no dupes, returns root.
    buildTree(arr) {
        function sortedArrToBST(arr, start, end) {
            if (start > end) return null;
            // Get the middle of the subarray, and make a root node with its value.
            let mid = start + Math.floor((end - start) / 2);
            let newRoot = new Node(arr[mid]);

            // Divide subarray into left and right.
            newRoot.left = sortedArrToBST(arr, start, mid - 1);
            newRoot.right = sortedArrToBST(arr, mid + 1, end);

            // Return the root at level with all children added.
            return newRoot;
        }
        // Sorts the array and removes duplicates.
        arr.sort((a, b) => a - b);
        let inputArray = [...new Set(arr)];

        // Return the root of the BST.
        return sortedArrToBST(inputArray, 0, inputArray.length - 1);
    }

    // Inserts given value in proper place in the BST.
    insert(value) {
        let newNode = new Node(value);
        let curNode = this.root;
        // Edge case, tree is empty.
        if (curNode == null) {
            this.root = newNode;
        } else {
            // Keep traversing while the proper child exists.
            while (
                (value < curNode.data && curNode.left !== null) ||
                (value > curNode.data && curNode.right !== null)
            ) {
                if (value < curNode.data) {
                    curNode = curNode.left;
                } else if (value > curNode.data) {
                    curNode = curNode.right;
                }
            }
            // Node inserted to left child.
            if (value < curNode.data) {
                curNode.left = newNode;
            } else if (value > curNode.data) {
                // Node inserted to right child.
                curNode.right = newNode;
            }
        }
    }

    // Removes value from the binary search tree.
    deleteItem(value) {
        let parentNode = null;
        let curNode = this.root;
        // Keep traversing the tree while possible.
        while (curNode !== null) {
            // Current node matches value, so do delete cases.
            if (value === curNode.data) {
                // Case 1, curNode has no children.
                if (!curNode.left && !curNode.right) {
                    // Remove the child from whichever side has cur node.
                    // The node is the root of the tree.
                    if (!parentNode) {
                        this.root = null;
                    } else if (parentNode.left == curNode)
                        parentNode.left = null;
                    else if (parentNode.right == curNode)
                        parentNode.right = null;
                }

                // Case 2, curNode has one child.
                else if (
                    (curNode.left && !curNode.right) ||
                    (curNode.right && !curNode.left)
                ) {
                    let childNode = curNode.left ?? curNode.right;
                    // Node is the root.
                    if (!parentNode) {
                        this.root = childNode;
                    } else if (parentNode.left == curNode)
                        parentNode.left = childNode;
                    else if (parentNode.right == curNode)
                        parentNode.right = childNode;
                } else {
                    // Case 3, curNode has two children.
                    // Get inorder successor
                    let successorParent = curNode;
                    let successor = curNode.right;
                    // Traverse down to get smallest value in right subtree.
                    while (successor.left !== null) {
                        successorParent = successor;
                        successor = successor.left;
                    }
                    curNode.data = successor.data;
                    // If successor has right child, link the successors' parent to this right child.
                    if (successorParent.left === successor) {
                        successorParent.left = successor.right;
                    } else {
                        successorParent.right = successor.right;
                    }
                }

                return;
            } else {
                parentNode = curNode;
                // Current node doesn't match, so continue traversing.
                if (value < curNode.data) {
                    curNode = curNode.left;
                } else if (value > curNode.data) {
                    curNode = curNode.right;
                }
            }
        }
    }

    // Returns the node with the given value.
    find(value) {
        let curNode = this.root;
        // Keep traversing the tree while possible.
        while (curNode !== null) {
            // Current node matches value, return.
            if (value === curNode.data) {
                return curNode;
            } else {
                // Current node doesn't match, so continue traversing.
                if (value < curNode.data) {
                    curNode = curNode.left;
                } else if (value > curNode.data) {
                    curNode = curNode.right;
                }
            }
        }
        // Got to the end of the tree and didn't find value.
        return null;
    }

    // Traverses the tree in breadth-first level order, and calls on each node traversed.
    levelOrderForEach(callback = null) {
        if (callback == null)
            throw new Error("A callback function is required.");
        let q = new LinkedList();
        q.prepend(this.root);
        while (q.length !== 0) {
            // Get the first element off the array (dequeue).
            let node = q.pop();
            // Push its children onto the queue (enqueue), and run callback on current.
            if (node.left !== null) q.prepend(node.left);
            if (node.right !== null) q.prepend(node.right);
            callback(node);
        }
    }

    // Perform in-order traversal of tree.
    inOrderForEach(callback = null, root = this.root) {
        if (callback == null)
            throw new Error("A callback function is required.");
        if (!root) return;
        // Traverse left subtree
        this.inOrderForEach(callback, root.left);
        // Visit current.
        callback(root);
        // Traverse right subtree.
        this.inOrderForEach(callback, root.right);
    }

    // Perform pre-order traversal of tree.
    preOrderForEach(callback = null, root = this.root) {
        if (callback == null)
            throw new Error("A callback function is required.");
        if (!root) return;
        // Visit current
        callback(root);
        // Traverse left subtree.
        this.preOrderForEach(callback, root.left);
        // Traverse right subtree.
        this.preOrderForEach(callback, root.right);
    }

    // Perform post-order traversal of tree.
    postOrderForEach(callback = null, root = this.root) {
        if (callback == null)
            throw new Error("A callback function is required.");
        if (!root) return;
        // Traverse left subtree
        this.postOrderForEach(callback, root.left);
        // Traverse right subtree.
        this.postOrderForEach(callback, root.right);
        // Visit current node.
        callback(root);
    }

    // Recursively travels down the tree from the root and returns max height.
    recursiveGetHeight(root = this.root) {
        // Base case, no root.
        if (!root) return 0;

        // Return the higher height subtree.
        return (
            1 +
            Math.max(
                this.recursiveGetHeight(root.left),
                this.recursiveGetHeight(root.right)
            )
        );
    }

    // Return the height of the node containing the given value.
    height(value) {
        // Get the node of value if it exists.
        let curNode = this.find(value);
        if (!curNode) return null;

        // Now call the recursive function to get the height.
        return this.recursiveGetHeight(curNode);
    }

    // Returns the depth of the node (number of edges in path from that node to the root).
    depth(value) {
        let depth = 0;
        let curNode = this.root;

        if (!curNode) return null;

        while (curNode !== null) {
            if (curNode.data === value) return depth;

            if (value < curNode.data) {
                curNode = curNode.left;
            } else if (value > curNode.data) {
                curNode = curNode.right;
            }
            depth += 1;
        }
        // Traversed the entire tree and couldn't find, return null.
        return null;
    }

    // Checks if the tree is balanced.
    isBalanced(root = this.root) {
        if (!root) return true;
        // Return the difference in the heights of the subtrees.
        return (
            Math.abs(
                this.recursiveGetHeight(root.left) -
                    this.recursiveGetHeight(root.right)
            ) <= 1 &&
            this.isBalanced(root.left) &&
            this.isBalanced(root.right)
        );
    }

    // Rebalances an unbalanced tree.
    rebalance() {
        // Put the tree elements into a sorted array.
        let inputArray = [];
        this.inOrderForEach((node) => inputArray.push(node.data));

        this.root = this.buildTree(inputArray);
    }
}

// For displaying the search tree graphically.
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let randomArr = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 100)
);

let t = new Tree();
t.root = t.buildTree(randomArr);

console.log(t.isBalanced());
prettyPrint(t.root);

t.insert(105);

prettyPrint(t.root);

t.insert(107);
t.insert(109);
t.insert(111);
t.insert(113);
t.insert(118);
t.insert(118);
t.insert(128);
t.insert(138);
t.insert(148);
t.insert(158);
t.insert(168);

console.log(t.isBalanced());
t.rebalance();
console.log(t.isBalanced());

prettyPrint(t.root);

let inOrderValues = [];
t.inOrderForEach((node) => inOrderValues.push(node.data));
console.log(inOrderValues);

let preOrderValues = [];
t.preOrderForEach((node) => preOrderValues.push(node.data));
console.log(preOrderValues);

let postOrderValues = [];
t.postOrderForEach((node) => postOrderValues.push(node.data));
console.log(postOrderValues);
