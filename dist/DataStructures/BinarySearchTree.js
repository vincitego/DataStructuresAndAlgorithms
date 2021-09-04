import { defaultMinCompare } from "../utility/utility.js";
import { LinkedList } from '../index.js';
/**
 * Binary Search Tree Node class to contain the data in a node.
 */
class BinarySearchTreeNode {
    /**
     * Creates a new node for a Binary Search Tree.
     * @param value Value of node.
     */
    constructor(value) {
        this.value = value;
    }
}
/**
 * Binary Search Tree implementation.
 */
export class BinarySearchTree {
    /**
     * Creates a new Binary Search Tree.
       * @param {function} comparisonFunction Function to use to compare node values.
     */
    constructor(comparisonFunction = defaultMinCompare) {
        if (typeof comparisonFunction !== 'function')
            throw new TypeError('comparisonFunction needs to be a function');
        this._root = undefined;
        this._size = 0;
        this._comparisonFunction = comparisonFunction;
    }
    /**
     * Adds new node to tree.
     * If value already exists, replaces the value at the node.
     * @param {T} value
     * @returns {this}
     */
    add(value) {
        const newNode = new BinarySearchTreeNode(value);
        if (this._size === 0) {
            this._root = newNode;
            this._size = 1;
        }
        else {
            let currentNode = this._root;
            while (true) {
                const comparison = this._comparisonFunction(value, currentNode.value);
                if (comparison === 0) {
                    currentNode.value = value;
                    break;
                }
                else if (comparison < 0 && currentNode.left === undefined) {
                    currentNode.left = newNode;
                    this._size++;
                    break;
                }
                else if (comparison < 0 && currentNode.left !== undefined) {
                    currentNode = currentNode.left;
                }
                else if (comparison > 0 && currentNode.right === undefined) {
                    currentNode.right = newNode;
                    this._size++;
                    break;
                }
                else if (comparison > 0 && currentNode.right !== undefined) {
                    currentNode = currentNode.right;
                }
            }
        }
        return this;
    }
    remove(value) {
        this._size--;
        return value;
    }
    /**
     * Finds a value in the tree using the comparison function at instantiation
     * @param {T} value Value to find
     * @returns {T | undefined}
     */
    find(value) {
        if (this._size === 0)
            return undefined;
        let currentNode = this._root;
        while (currentNode !== undefined) {
            const comparison = this._comparisonFunction(value, currentNode.value);
            if (comparison === 0) {
                break;
            }
            else if (comparison < 0) {
                currentNode = currentNode.left;
            }
            else if (comparison > 0) {
                currentNode = currentNode.right;
            }
            else {
                currentNode = undefined;
            }
        }
        return currentNode === null || currentNode === void 0 ? void 0 : currentNode.value;
    }
    /**
     * Get size of tree.
     * @returns {number}
     */
    size() {
        return this._size;
    }
    /**
     * Removes all nodes from tree.
     * @returns {this}
     */
    clear() {
        this._size = 0;
        this._root = undefined;
        return this;
    }
    *preOrderTraversal() {
        if (this._size === 0)
            return;
    }
    *postOrderTraversal() {
        if (this._size === 0)
            return;
    }
    *inOrderTraversal() {
        if (this._size === 0)
            return;
    }
    /**
     * Iterates tree in level order.
     * @returns {Generator<T>}
     */
    *levelOrderTraversal() {
        if (this._size === 0)
            return;
        const stack = new LinkedList();
        stack.addBack(this._root);
        while (stack.size() > 0) {
            const node = stack.removeFront();
            if (node.left !== undefined)
                stack.addBack(node.left);
            if (node.right !== undefined)
                stack.addBack(node.right);
            yield node.value;
        }
    }
}
