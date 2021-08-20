import { defaultMinCompare } from "../utility/utility.js";
export class BinaryHeap {
    /**
     * Creates a new binary heap with a given comparison.
     * Default comparison function is a min heap.
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
     * Get size of heap.
     * @returns {number}
     */
    size() {
        return this._size;
    }
    /**
     * Add new value to the heap.
     * @param {T} value
     * @returns BinaryHeap<T> Returns self.
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
     * Peek at value at top of heap.
     * @returns {T}
     */
    peek() {
        return this._heap[0];
    }
    /**
     * Peek at value of heap at given index.
     * @param {number} index Index of heap to peek at.
     * @returns {T}
     */
    peekAt(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index < 0 || index >= this._size)
            throw new RangeError('Index out of range.');
        return this._heap[index];
    }
    poll() {
    }
    _sink(index) {
    }
    _swim(index) {
        if (index === 0)
            return;
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
    }
    /**
     * Utility function to calculate parent index for a given child index.
     * @param {number} index Index to calculate parent of.
     * @returns {number}
     */
    _calcParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    /**
     * Utility function to calculate index of the left child of the given index.
     * @param {number} index Index to calculate left child of.
     * @returns {number}
     */
    _calcLeftChildIndex(index) {
        return index * 2 + 1;
    }
    /**
     * Utility function to calculate index of the right child of the given index.
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
        for (const value of this._heap) {
            yield value;
        }
    }
}
