import { defaultMinCompare } from "../utility/utility.js";

export class BinaryHeap<T> implements Iterable<T> {
	private _heap: T[];
	private _size: number;
	private _comparisonFunction: <T>(a: T, b: T) => number;


	/**
	 * Creates a new binary heap with a given comparison.
	 * Default comparison function is a min heap.
	 * @param {function} comparisonFunction Function to use to compare node values.
	 */
	constructor(comparisonFunction: <T>(a: T, b: T) => number = defaultMinCompare) {
		if (typeof comparisonFunction !== 'function') throw new TypeError('comparisonFunction needs to be a function');

		this._heap = [];
		this._size = 0;
		this._comparisonFunction = comparisonFunction;
	}


	/**
	 * Get size of heap.
	 * @returns {number}
	 */
	size(): number {
		return this._size;
	}


	/**
	 * Add new value to the heap.
	 * @param {T} value 
	 * @returns BinaryHeap<T> Returns self.
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


	poll() {

	}

	
	private _sink(index: number) {

	}


	private _swim(index: number): void {
		if (index === 0) return;

		const value = this._heap[index];
		let childIndex = index;

		do {
			const parentIndex = this._calcParentIndex(childIndex)!;
			const parentValue = this._heap[parentIndex];

			if (this._comparisonFunction<T>(value, parentValue) < 0) {
				this._heap[childIndex] = parentValue;
				childIndex = parentIndex;
			} else {
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