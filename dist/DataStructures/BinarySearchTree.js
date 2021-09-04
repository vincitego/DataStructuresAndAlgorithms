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
    /**
     * Removes a node matching given value using the comparison function given at initialization.
     * @param {T} value
     * @returns {T | undefined}
     */
    remove(value) {
        var _a;
        let currentNode = this._root;
        let currentValue = (_a = this._root) === null || _a === void 0 ? void 0 : _a.value;
        let parentNode = this._root;
        let wentLeft = false;
        while (currentNode !== undefined) {
            const comparison = this._comparisonFunction(value, currentNode.value);
            if (comparison === 0) {
                if (this._size === 1) {
                    this._root = undefined;
                }
                else if (currentNode.left === undefined && currentNode.right === undefined) {
                    if (wentLeft) {
                        parentNode.left = undefined;
                    }
                    else {
                        parentNode.right = undefined;
                    }
                }
                else if (currentNode.left !== undefined && currentNode.right === undefined) {
                    const leftNode = currentNode.left;
                    currentNode.value = leftNode.value;
                    currentNode.left = leftNode.left;
                    currentNode.right = leftNode.right;
                }
                else if (currentNode.left === undefined && currentNode.right !== undefined) {
                    const rightNode = currentNode.right;
                    currentNode.value = rightNode.value;
                    currentNode.left = rightNode.left;
                    currentNode.right = rightNode.right;
                }
                else {
                    let replacementNode = currentNode.right;
                    let replacementParent = currentNode;
                    let replaceLeft = false;
                    while (replacementNode.left !== undefined) {
                        replacementParent = replacementNode;
                        replacementNode = replacementNode.left;
                        replaceLeft = true;
                    }
                    currentNode.value = replacementNode.value;
                    if (replaceLeft) {
                        replacementParent.left = replacementNode.right;
                    }
                    else {
                        replacementParent.right = replacementNode.right;
                    }
                }
                this._size--;
                break;
            }
            else if (comparison < 0) {
                parentNode = currentNode;
                currentNode = currentNode.left;
                currentValue = currentNode === null || currentNode === void 0 ? void 0 : currentNode.value;
                wentLeft = true;
            }
            else if (comparison > 0) {
                parentNode = currentNode;
                currentNode = currentNode.right;
                currentValue = currentNode === null || currentNode === void 0 ? void 0 : currentNode.value;
                wentLeft = false;
            }
            else {
                currentNode = undefined;
                currentValue = undefined;
            }
        }
        return currentValue;
    }
    /**
     * Finds a value in the tree using the comparison function at instantiation
     * @param {T} value Value to find
     * @returns {T | undefined}
     */
    find(value) {
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
    /**
     * Iterates tree in pre-order.
     * @returns {Generator<T>}
     */
    *preOrderTraversal() {
        if (this._size === 0)
            return;
        const stack = [this._root];
        while (stack.length > 0) {
            const node = stack.pop();
            yield node.value;
            if (node.right !== undefined)
                stack.push(node.right);
            if (node.left !== undefined)
                stack.push(node.left);
        }
    }
    *inOrderTraversal() {
        if (this._size === 0)
            return;
    }
    *postOrderTraversal() {
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
        const queue = new LinkedList();
        queue.addBack(this._root);
        while (queue.size() > 0) {
            const node = queue.removeFront();
            if (node.left !== undefined)
                queue.addBack(node.left);
            if (node.right !== undefined)
                queue.addBack(node.right);
            yield node.value;
        }
    }
}
