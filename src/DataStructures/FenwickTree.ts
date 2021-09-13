/**
 * Fenwick Tree implementation
 */
export class FenwickTree implements Iterable<number> {
	private _tree: number[];


	/**
	 * Creates a new fenwick tree. O(n)
	 */
	constructor(values?: number[]) {
		if (values === undefined) {
			this._tree = [0];
		} else if (!Array.isArray(values)) {
			throw new TypeError('Values needs to be an array.');
		} else {
			this._tree = [0, ...values];
		}

		const treeLength = this._tree.length;

		for (let i = 1; i < treeLength; i++) {
			const parentIndex = i + this._lsb(i);
			if (parentIndex < treeLength) this._tree[parentIndex] += this._tree[i];
		}
	}


	/**
	 * Add new value to end of tree. O(logn)
	 * @param {number} value 
	 * @returns {this} Returns self
	 */
	push(value: number): this {
		if (typeof value !== 'number') throw new TypeError('Value needs to be a number');

		const index = this._tree.length;
		const startRange = index - this._lsb(index) + 1;
		const sum = value + (index === startRange ? 0 : this.query(startRange, index - 1));

		this._tree.push(sum);
		return this;
	}


	/**
	 * Set value at index to a given value. O(logn)
	 * @param {number} index 
	 * @param {number} value 
	 * @returns {this} Returns self
	 */
	set(index: number, value: number): this {
		if (typeof index !== 'number') throw new TypeError('Index needs to be a number');
		if (index < 1 || index > this.size()) throw new RangeError('Index out of range');

		const difference = value - this._tree[index];
		if (difference === 0) return this;
		return this.add(index, difference);
	}


	/**
	 * Increment value at index by a given value. O(logn)
	 * @param {number} index 
	 * @param {number} value 
	 * @returns {this} Returns self
	 */
	add(index: number, value: number): this {
		if (typeof index !== 'number') throw new TypeError('Index needs to be a number');
		if (index < 1 || index > this.size()) throw new RangeError('Index out of range');

		let i = index;

		while (i <= this.size()) {
			this._tree[i] += value;
			i += this._lsb(i);
		}

		return this;
	}


	/**
	 * Returns sum of elements in tree from one given index to another. O(logn)
	 * If no second index is given, returns the value of the element.
	 * @param {number} left Index of left part of range.
	 * @param {number} right Optional index of right part of range.
	 * @returns {number} Value of sum of the elements in the range.
	 */
	query(left: number, right?: number): number {
		if (typeof left !== 'number') throw new TypeError('Left needs to be a number');
		if (left < 1 || left > this.size()) throw new RangeError('Left index out of range');

		if (right !== undefined) {
			if (typeof right !== 'number') throw new TypeError('Right needs to be a number');
			if (right < 1 || right > this.size()) throw new RangeError('Right index out of range');
			if (left > right) throw new RangeError('Left index cannot be greater than right index');
		}

		return this._prefixSum(right ?? left) - this._prefixSum(left - 1);
	}


	/**
	 * Get number of elements in tree. O(1)
	 * @returns {number}
	 */
	size(): number {
		return this._tree.length - 1;
	}


	/**
	 * Utility function to get least significant bit. O(1)
	 * @param {number} num 
	 * @returns {number}
	 */
	private _lsb(num: number): number {
		return num & (-num);
	}


	/**
	 * Get prefix sum of elements in tree from first element to given index. O(logn)
	 * @param {number} index 
	 * @returns {number}
	 */
	private _prefixSum(index: number): number {
		let i = index;
		let sum = 0;

		while (i > 0) {
			sum += this._tree[i];
			i -= this._lsb(i);
		}

		return sum;
	}


  /**
   * Iterator to allow looping. O(n)
   */
	*[Symbol.iterator](): Iterator<number> {
    for (const value of this._tree.slice(1)) {
      yield value;
    }
  }
}