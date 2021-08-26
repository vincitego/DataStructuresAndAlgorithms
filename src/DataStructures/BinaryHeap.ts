import { defaultMinCompare } from "../utility/utility.js";


/**
 * Binary Heap implementation.
 */
export class BinaryHeap<T> implements Iterable<T> {
	private _heap: T[];
	private _size: number;
	private _comparisonFunction: (a: T, b: T) => number;


	/**
	 * Creates a new binary heap.
 	 * Default comparison function is a min heap.
 	 * Can be used as a priority queue.
	 * @param {function} comparisonFunction Function to use to compare node values.
	 */
	constructor(comparisonFunction: (a: T, b: T) => number = defaultMinCompare) {
		if (typeof comparisonFunction !== 'function') throw new TypeError('comparisonFunction needs to be a function');

		this._heap = [];
		this._size = 0;
		this._comparisonFunction = comparisonFunction;
	}


	/**
	 * Add new value to the heap.
	 * @param {T} value 
	 * @returns {BinaryHeap<T>} Returns self.
	 */
	add(value: T): BinaryHeap<T> {
		const addIndex = this._size;

		if (this._size === this._heap.length) {
			this._heap.push(value);
		} else {
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
	peek(): T {
		return this._heap[0];
	}


	/**
	 * Peek at value of heap at given index.
	 * @param {number} index Index of heap to peek at.
	 * @returns {T}
	 */
	peekAt(index: number): T {
		if (typeof index !== 'number') throw new TypeError('Index needs to be a number.');
		if (index < 0 || index >= this._size) throw new RangeError('Index out of range.');
		return this._heap[index];
	}


	/**
	 * Returns value at top of heap and removes the node.
	 * @returns {T | undefined}
	 */
	poll(): T | undefined {
		if (this._size === 0) return undefined;

		const value = this._heap[0];
		this._size--;
		this._heap[0] = this._heap[this._size];

		if (this._size === 0) return value;
		this._sink(0);
		return value;
	}


	/**
	 * Returns value at given index and removes the node.
	 * @param index 
	 * @returns {T | undefined}
	 */
	removeAt(index: number): T | undefined {
		if (typeof index !== 'number') throw new TypeError('Index needs to be a number.');
		if (index < 0 || index >= this._size) throw new RangeError('Index out of range.');
		if (index === 0) return this.poll();

		const value = this._heap[index];
		this._size--;
		this._heap[index] = this._heap[this._size];

		if (this._swim(index) === index) {
			this._sink(index);
		}

		return value;
	}


	/**
	 * Get size of heap.
	 * @returns {number}
	 */
	size(): number {
		return this._size;
	}


	/**
	 * Clears the binary heap.
	 * @returns {BinaryHeap<T>} Returns self.
	 */
	clear(): BinaryHeap<T> {
		this._heap = [];
		this._size = 0;
		return this;
	}


  /**
   * Find index of first value matching given value or where given callback evaluates to true.
   * @param {} valueOrCallback 
   * @returns {number}
   */
	findIndex(valueOrCallback: T | ((node: T) => boolean)): number {
    if (this._size === 0) return -1;

    let index = 0;

    for (const node of this) {
      if (typeof valueOrCallback === 'function' && (valueOrCallback as (node: T) => boolean)(node)) {
        return index;
      } else if (valueOrCallback === node) {
        return index;
      }
      
      index++;
    }

    return -1;
	}

	
	/**
	 * Utility function to move values down heap based on comparison function.
	 * @param {number} index 
	 * @returns {number}
	 */
	private _sink(index: number): number {
		const value = this._heap[index];
		const bottomIndex = this._size - 1;
		let currentIndex = index;

		do {
			const leftChildIndex = this._calcLeftChildIndex(currentIndex);
			const leftChildValue = this._heap[leftChildIndex];
			const rightChildIndex = this._calcRightChildIndex(currentIndex);
			const rightChildValue = this._heap[rightChildIndex];

			if (
				leftChildIndex <= bottomIndex && 
				this._comparisonFunction(value, leftChildValue) > 0 &&
				this._comparisonFunction(leftChildValue, rightChildValue) <= 0
			) {
				this._heap[currentIndex] = leftChildValue;
				currentIndex = leftChildIndex;

			} else if (rightChildIndex <= bottomIndex && this._comparisonFunction(value, rightChildValue) > 0) {
				this._heap[currentIndex] = rightChildValue;
				currentIndex = rightChildIndex;

			} else {
				break;
			}

		} while (currentIndex !== bottomIndex);

		this._heap[currentIndex] = value;
		return currentIndex;
	}


	/**
	 * Utility function to move values up heap based on comparison function.
	 * @param {number} index 
	 * @returns {number}
	 */
	private _swim(index: number): number {
		if (index === 0) return 0;

		const value = this._heap[index];
		let childIndex = index;

		do {
			const parentIndex = this._calcParentIndex(childIndex)!;
			const parentValue = this._heap[parentIndex];

			if (this._comparisonFunction(value, parentValue) < 0) {
				this._heap[childIndex] = parentValue;
				childIndex = parentIndex;
			} else {
				break;
			}
		} while (childIndex !== 0);

		this._heap[childIndex] = value;
		return childIndex;
	}


	/**
	 * Utility function to calculate parent index for a given child index.
	 * @param {number} index Index to calculate parent of.
	 * @returns {number}
	 */
	private _calcParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}


	/**
	 * Utility function to calculate index of the left child of the given index.
	 * @param {number} index Index to calculate left child of.
	 * @returns {number}
	 */
	private _calcLeftChildIndex(index: number): number {
		return index * 2 + 1;
	}


	/**
	 * Utility function to calculate index of the right child of the given index.
	 * @param {number} index Index to calculate right child of.
	 * @returns {number}
	 */
	private _calcRightChildIndex(index: number): number {
		return index * 2 + 2;
	}


  /**
   * Iterator to allow looping.
   */
	 *[Symbol.iterator](): Iterator<T> {
    for (const value of this._heap) {
      yield value;
    }
  }
}