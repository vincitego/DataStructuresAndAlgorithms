import { defaultMinCompare } from "../utility/utility.js";
/**
 * Binary Heap implementation.
 */
export class BinaryHeap {
    /**
     * Creates a new binary heap.
     * Default comparison function is a min heap.
     * Can be used as a priority queue.
     * @param {function} comparisonFunction Function to use to compare node values.
     */
    constructor(comparisonFunction = defaultMinCompare) {
        if (typeof comparisonFunction !== 'function')
            throw new TypeError('comparisonFunction needs to be a function');
        this._heap = [];
        this._size = 0;
        this._comparisonFunction = comparisonFunction;
    }
    /**
     * Add new value to the heap. O(logn)
     * @param {T} value
     * @returns {BinaryHeap<T>} Returns self.
     */
    add(value) {
        const addIndex = this._size;
        if (this._size === this._heap.length) {
            this._heap.push(value);
        }
        else {
            this._heap[addIndex] = value;
        }
        this._size++;
        this._swim(addIndex);
        return this;
    }
    /**
     * Peek at value at top of heap. O(1)
     * @returns {T}
     */
    peek() {
        return this._heap[0];
    }
    /**
     * Returns value at top of heap and removes the node. O(logn)
     * @returns {T | undefined}
     */
    poll() {
        if (this._size === 0)
            return undefined;
        const value = this._heap[0];
        this._size--;
        this._heap[0] = this._heap[this._size];
        if (this._size === 0)
            return value;
        this._sink(0);
        return value;
    }
    /**
     * Returns original value from given value and removes the node. O(n)
   * @param {T} value Value to find using comparison function defined at instantiation
     * @returns {T | undefined}
     */
    remove(value) {
        if (this._size === 0)
            return undefined;
        for (let index = 0; index < this._size; index++) {
            const currentValue = this._heap[index];
            if (this._comparisonFunction(value, currentValue) === 0) {
                this._size--;
                this._heap[index] = this._heap[this._size];
                if (this._swim(index) === index) {
                    this._sink(index);
                }
                return currentValue;
            }
        }
        return undefined;
    }
    /**
     * Get size of heap. O(1)
     * @returns {number}
     */
    size() {
        return this._size;
    }
    /**
     * Clears the binary heap. O(1)
     * @returns {BinaryHeap<T>} Returns self.
     */
    clear() {
        this._heap = [];
        this._size = 0;
        return this;
    }
    /**
     * Find node of first matching given value. O(n)
     * @param {T} value Value to find using comparison function specified at instantiation
     * @returns {number}
     */
    find(value) {
        if (this._size === 0)
            return undefined;
        for (const node of this) {
            if (this._comparisonFunction(value, node) === 0) {
                return node;
            }
        }
        return undefined;
    }
    /**
     * Utility function to move values down heap based on comparison function. O(logn)
     * @param {number} index
     * @returns {number}
     */
    _sink(index) {
        const value = this._heap[index];
        const bottomIndex = this._size - 1;
        let currentIndex = index;
        do {
            const leftChildIndex = this._calcLeftChildIndex(currentIndex);
            const leftChildValue = this._heap[leftChildIndex];
            const rightChildIndex = this._calcRightChildIndex(currentIndex);
            const rightChildValue = this._heap[rightChildIndex];
            if (leftChildIndex <= bottomIndex &&
                this._comparisonFunction(value, leftChildValue) > 0 &&
                this._comparisonFunction(leftChildValue, rightChildValue) <= 0) {
                this._heap[currentIndex] = leftChildValue;
                currentIndex = leftChildIndex;
            }
            else if (rightChildIndex <= bottomIndex && this._comparisonFunction(value, rightChildValue) > 0) {
                this._heap[currentIndex] = rightChildValue;
                currentIndex = rightChildIndex;
            }
            else {
                break;
            }
        } while (currentIndex !== bottomIndex);
        this._heap[currentIndex] = value;
        return currentIndex;
    }
    /**
     * Utility function to move values up heap based on comparison function. O(logn)
     * @param {number} index
     * @returns {number}
     */
    _swim(index) {
        if (index === 0)
            return 0;
        const value = this._heap[index];
        let childIndex = index;
        do {
            const parentIndex = this._calcParentIndex(childIndex);
            const parentValue = this._heap[parentIndex];
            if (this._comparisonFunction(value, parentValue) < 0) {
                this._heap[childIndex] = parentValue;
                childIndex = parentIndex;
            }
            else {
                break;
            }
        } while (childIndex !== 0);
        this._heap[childIndex] = value;
        return childIndex;
    }
    /**
     * Utility function to calculate parent index for a given child index. O(1)
     * @param {number} index Index to calculate parent of.
     * @returns {number}
     */
    _calcParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    /**
     * Utility function to calculate index of the left child of the given index. O(1)
     * @param {number} index Index to calculate left child of.
     * @returns {number}
     */
    _calcLeftChildIndex(index) {
        return index * 2 + 1;
    }
    /**
     * Utility function to calculate index of the right child of the given index. O(1)
     * @param {number} index Index to calculate right child of.
     * @returns {number}
     */
    _calcRightChildIndex(index) {
        return index * 2 + 2;
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this._size; i++) {
            yield this._heap[i];
        }
    }
}
