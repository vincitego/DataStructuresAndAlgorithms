import { defaultMinCompare } from "../utility/utility.js";


/**
 * Indexed Priority Queue implementation.
 */
export class IndexedPriorityQueue<K, T> implements Iterable<T> {
	private _heap: T[];
	private _size: number;
	private _comparisonFunction: (a: T, b: T) => number;

	private _currentKeyIndex: number;
	private _keyToKeyIndex: Map<K, number>;
	private _keyIndexToKey: Map<number, K>;
	private _keyIndexToHeapIndex: number[];
	private _heapIndexToKeyIndex: number[];


	/**
	 * Creates a new indexed priority queue.
 	 * Default comparison function results in a min queue.
	 * @param {function} comparisonFunction Function to use to compare node values.
	 */
	constructor(comparisonFunction: (a: T, b: T) => number = defaultMinCompare) {
		if (typeof comparisonFunction !== 'function') throw new TypeError('comparisonFunction needs to be a function');

		this._heap = [];
		this._size = 0;
		this._comparisonFunction = comparisonFunction;

		this._currentKeyIndex = 0;
		this._keyToKeyIndex = new Map<K, number>();
		this._keyIndexToKey = new Map<number, K>();
		this._keyIndexToHeapIndex = [];
		this._heapIndexToKeyIndex = [];
	}


	/**
	 * Add new value to the heap. O(logn)
	 * @param {K} key
	 * @param {T} value 
	 * @returns {this} Returns self.
	 */
	add(key: K, value: T): this {
		if (this._keyToKeyIndex.has(key)) return this.update(key, value);

		const heapIndex = this._size;

		if (this._size === this._heap.length) {
			this._heap.push(value);
			this._heapIndexToKeyIndex.push(this._currentKeyIndex);
		} else {
			this._heap[heapIndex] = value;
			this._heapIndexToKeyIndex[heapIndex] = this._currentKeyIndex;
		}

		this._keyToKeyIndex.set(key, this._currentKeyIndex);
		this._keyIndexToKey.set(this._currentKeyIndex, key);
		this._keyIndexToHeapIndex.push(heapIndex);

		this._size++;
		this._currentKeyIndex++;
		this._swim(heapIndex);
		return this;
	}


	/**
	 * Updates existing key to new value. O(logn)
	 * @param {K} key
	 * @param {T} value 
	 * @returns {this} Returns self.
	 */
	update(key: K, value: T): this {
		if (!this._keyToKeyIndex.has(key)) throw new RangeError('Key does not exist');

		const keyIndex = this._keyToKeyIndex.get(key)!;
		const heapIndex = this._keyIndexToHeapIndex[keyIndex];
		if (heapIndex === -1) throw new RangeError('Key does not exist');

		this._heap[heapIndex] = value;

		if (this._swim(heapIndex) === heapIndex) {
			this._sink(heapIndex);
		}

		return this;
	}


	/**
	 * Peek at value at top of heap. O(1)
	 * @returns {T}
	 */
	peek(): [K, T] {
		const key = this._keyIndexToKey.get(this._heapIndexToKeyIndex[0])!;
		return [key, this._heap[0]];
	}


	/**
	 * Returns value at top of heap and removes the node. O(logn)
	 * @returns {T | undefined}
	 */
	poll(): [K, T] | undefined {
		if (this._size === 0) return undefined;
		this._size--;

		const key = this._keyIndexToKey.get(this._heapIndexToKeyIndex[0])!;
		const value = this._heap[0];
		const polledKeyIndex = this._heapIndexToKeyIndex[0];
		const replacementKeyIndex = this._heapIndexToKeyIndex[this._size];

		this._heap[0] = this._heap[this._size];
		this._heap[this._size] = undefined as any;
		this._heapIndexToKeyIndex[0] = replacementKeyIndex;
		this._keyIndexToHeapIndex[polledKeyIndex] = -1;
		this._keyIndexToHeapIndex[replacementKeyIndex] = 0;

		if (this._size === 0) return [key, value];
		this._sink(0);
		return [key, value];
	}


	/**
	 * Returns original value from given value and removes the node. O(logn)
   * @param {T} key Value to find using comparison function defined at instantiation
	 * @returns {T | undefined}
	 */
	remove(key: K): T | undefined {
    if (this._size === 0) return undefined;
		if (!this._keyToKeyIndex.has(key)) return undefined;

		const removedKeyIndex = this._keyToKeyIndex.get(key)!;
		const removedHeapIndex = this._keyIndexToHeapIndex[removedKeyIndex];
		if (removedHeapIndex === -1) return undefined;


		this._size--;

		const currentValue = this._heap[removedHeapIndex];
		const replacementKeyIndex = this._heapIndexToKeyIndex[this._size];

		this._heap[removedHeapIndex] = this._heap[this._size];
		this._heap[this._size] = undefined as any;
		this._heapIndexToKeyIndex[removedHeapIndex] = replacementKeyIndex;
		this._keyIndexToHeapIndex[removedHeapIndex] = -1;
		this._keyIndexToHeapIndex[replacementKeyIndex] = removedHeapIndex;


		if (this._swim(removedHeapIndex) === removedHeapIndex) {
			this._sink(removedHeapIndex);
		}

		return currentValue;
	}


	/**
	 * Get size of heap. O(1)
	 * @returns {number}
	 */
	size(): number {
		return this._size;
	}


	/**
	 * Clears the binary heap. O(1)
	 * @returns {this} Returns self.
	 */
	clear(): this {
		this._heap = [];
		this._size = 0;
		this._currentKeyIndex = 0;
		this._keyToKeyIndex.clear();
		this._keyIndexToKey.clear();
		this._keyIndexToHeapIndex = [];
		this._heapIndexToKeyIndex = [];
		return this;
	}


  /**
   * Get value of a given key. O(1)
   * @param {T} value Value to find using comparison function specified at instantiation
   * @returns {number}
   */
	get(key: K): T | undefined {
    if (this._size === 0) return undefined;
		if (!this._keyToKeyIndex.has(key)) return undefined;

		const keyIndex = this._keyToKeyIndex.get(key)!;
		const heapIndex = this._keyIndexToHeapIndex[keyIndex];
		if (heapIndex === -1) return undefined;

		return this._heap[heapIndex];
	}


	/**
	 * Get array of keys in the heap
	 * @returns {K[]}
	 */
	keys(): K[] {
		return Array.from(this._keyToKeyIndex.entries())
			.filter(([, keyIndex]) => this._keyIndexToHeapIndex[keyIndex] !== -1)
			.map(el => el[0]);
	}


	/**
	 * Utility function to swap values of two indexes in the heap. O(1)
	 * @param {number} aHeapIndex 
	 * @param {number} bHeapIndex 
	 * @returns {this}
	 */
	private _swapHeapIndex(aHeapIndex: number, bHeapIndex: number): this {
		const aKeyIndex = this._heapIndexToKeyIndex[aHeapIndex];
		const bKeyIndex = this._heapIndexToKeyIndex[bHeapIndex];
		const aHeapValue = this._heap[aHeapIndex];

		this._heap[aHeapIndex] = this._heap[bHeapIndex];
		this._heap[bHeapIndex] = aHeapValue;

		this._heapIndexToKeyIndex[aHeapIndex] = bKeyIndex;
		this._heapIndexToKeyIndex[bHeapIndex] = aKeyIndex;

		this._keyIndexToHeapIndex[aKeyIndex] = bHeapIndex;
		this._keyIndexToHeapIndex[bKeyIndex] = aHeapIndex;

		return this;
	}

	
	/**
	 * Utility function to move values down heap based on comparison function. O(logn)
	 * @param {number} heapIndex 
	 * @returns {number}
	 */
	private _sink(heapIndex: number): number {
		const value = this._heap[heapIndex];
		const bottomHeapIndex = this._size - 1;
		let currentHeapIndex = heapIndex;

		do {
			const leftChildHeapIndex = this._calcLeftChildIndex(currentHeapIndex);
			const leftChildValue = this._heap[leftChildHeapIndex];
			const rightChildHeapIndex = this._calcRightChildIndex(currentHeapIndex);
			const rightChildValue = this._heap[rightChildHeapIndex];

			if (
				leftChildHeapIndex <= bottomHeapIndex && 
				this._comparisonFunction(value, leftChildValue) > 0 &&
				this._comparisonFunction(leftChildValue, rightChildValue) <= 0
			) {
				this._swapHeapIndex(currentHeapIndex, leftChildHeapIndex);
				currentHeapIndex = leftChildHeapIndex;

			} else if (rightChildHeapIndex <= bottomHeapIndex && this._comparisonFunction(value, rightChildValue) > 0) {
				this._swapHeapIndex(currentHeapIndex, rightChildHeapIndex);
				currentHeapIndex = rightChildHeapIndex;

			} else {
				break;
			}

		} while (currentHeapIndex !== bottomHeapIndex);

		return currentHeapIndex;
	}


	/**
	 * Utility function to move values up heap based on comparison function. O(logn)
	 * @param {number} heapIndex 
	 * @returns {number}
	 */
	private _swim(heapIndex: number): number {
		if (heapIndex === 0) return 0;

		const value = this._heap[heapIndex];
		let childHeapIndex = heapIndex;

		do {
			const parentHeapIndex = this._calcParentIndex(childHeapIndex)!;
			const parentValue = this._heap[parentHeapIndex];

			if (this._comparisonFunction(value, parentValue) < 0) {
				this._swapHeapIndex(childHeapIndex, parentHeapIndex);
				childHeapIndex = parentHeapIndex;
			} else {
				break;
			}
		} while (childHeapIndex !== 0);

		return childHeapIndex;
	}


	/**
	 * Utility function to calculate parent index for a given child index. O(1)
	 * @param {number} index Index to calculate parent of.
	 * @returns {number}
	 */
	private _calcParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}


	/**
	 * Utility function to calculate index of the left child of the given index. O(1)
	 * @param {number} index Index to calculate left child of.
	 * @returns {number}
	 */
	private _calcLeftChildIndex(index: number): number {
		return index * 2 + 1;
	}


	/**
	 * Utility function to calculate index of the right child of the given index. O(1)
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
    for (let i = 0; i < this._size; i++) {
      yield this._heap[i];
    }
  }
}