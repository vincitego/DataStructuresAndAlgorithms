import { isIterable } from '../utility/utility.js';
import { LinkedListNode } from './LinkedListNode.js';
export class LinkedList {
    /**
     * Creates a Linked List.
     * Can be used as a Queue. For a Stack, use an Array.
     */
    constructor() {
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    /**
     * Creates a Linked List from and iterable of elements.
     * @param {Object} iterable Iterable to populate elements from.
     * @returns {LinkedList<T>}
     */
    static from(iterable) {
        if (!isIterable(iterable))
            throw new TypeError('Not an iterable');
        const newLinkedList = new LinkedList();
        for (const element of iterable) {
            newLinkedList.addBack(element);
        }
        return newLinkedList;
    }
    /**
     * Returns size of linked list.
     * @returns {number}
     */
    size() {
        return this._size;
    }
    /**
     * Add new node to beginning of Linked List.
     * @param {T} value Value of new node.
     * @returns {LinkedList<T>} Returns self.
     */
    addFront(value) {
        const newNode = new LinkedListNode(value);
        if (this._size === 0) {
            this._tail = newNode;
        }
        else {
            newNode.next = this._head;
        }
        this._head = newNode;
        this._size++;
        return this;
    }
    /**
     * Add new node to end of Linked List.
     * @param {T} value Value of new node.
     * @returns {LinkedList<T>} Returns self.
     */
    addBack(value) {
        const newNode = new LinkedListNode(value);
        if (this._size === 0) {
            this._head = newNode;
        }
        else {
            this._tail.next = newNode;
        }
        this._tail = newNode;
        this._size++;
        return this;
    }
    /**
     * Add new node to beginning of Linked List.
     * @param {number} index Index to add new node at.
     * @param {T} value Value of new node.
     * @returns {LinkedList<T>} Returns self.
     */
    addAt(index, value) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index === 0)
            return this.addFront(value);
        if (index === this._size)
            return this.addBack(value);
        if (index > this._size || index < 0)
            throw new RangeError('Index out of range.');
        const newNode = new LinkedListNode(value);
        let previousNode = this._head;
        for (let i = 1; i < index; i++) {
            previousNode = previousNode.next;
        }
        newNode.next = previousNode.next;
        previousNode.next = newNode;
        this._size++;
        return this;
    }
    /**
     * Get value at front of Linked List without removing the node.
     * @returns {T | undefined}
     */
    peekFront() {
        var _a;
        return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
    }
    /**
     * Get value at back of Linked List without removing the node.
     * @returns {T | undefined}
     */
    peekBack() {
        var _a;
        return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
    }
    /**
     * Get value at given index of Linked List without removing the node.
     * @param {number} index Index of node to peek at.
     * @returns {T | undefined}
     */
    peekAt(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index >= this._size || index < 0)
            return undefined;
        let node = this._head;
        for (let i = 1; i <= index; i++) {
            node = node.next;
        }
        return node.value;
    }
    /**
     * Get value at front of Linked List and remove the node.
     * @returns {T | undefined}
     */
    removeFront() {
        if (this._size === 0)
            return undefined;
        const value = this._head.value;
        this._head = this._head.next;
        this._size--;
        if (this._size === 0)
            this._tail = undefined;
        return value;
    }
    /**
     * Remove node at given index of Linked List.
     * @param {number} index Index of node to remove.
     * @returns {T | undefined}
     */
    removeAt(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index === 0)
            return this.removeFront();
        if (index >= this._size || index < 0)
            throw new RangeError('Index out of range.');
        let previousNode = this._head;
        let currentNode = this._head;
        for (let i = 1; i <= index; i++) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
        if (currentNode === this._tail)
            this._tail = previousNode;
        this._size--;
        return currentNode.value;
    }
    /**
     * Clears all nodes from Linked List.
     * @returns {LinkedList<T>} Returns self.
     */
    clear() {
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        return this;
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        if (this._size === 0)
            return;
        for (let curr = this._head; curr !== undefined; curr = curr.next) {
            yield curr.value;
        }
    }
}
