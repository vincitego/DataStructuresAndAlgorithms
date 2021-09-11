export class LongestCommonPrefix<T> implements Iterable<[number, number]> {
	private _original: string | number[];
	private _lcpArray: [number, number][];


	/**
	 * Suffix and Longest Common Prefix Array implementation. O(nlogn)
	 * @param {string} stringOrArray String or array of values to build prefixes from.
	 */
	constructor(stringOrArray: string | number[], ) {
		let comparisonFunction: undefined | ((a: any, b: any) => number);

		if (typeof stringOrArray === 'string') {
			comparisonFunction = (a: string, b: string) => {
				if (a[2] > b[2]) return 1;
				if (a[2] === b[2]) return 0;
				return -1;
			};

		} else if (Array.isArray(stringOrArray)) {
			comparisonFunction = (a: number[][], b: number[][]) => {
				const minLength = Math.min(a.length, b.length);

				for (let i = 0; i < minLength; i++) {
					if (a[2][i] > b[2][i]) return 1;
					if (a[2][i] < b[2][i]) return -1;
				}

				if (a[2].length > b[2].length) return 1;
				if (a[2].length < b[2].length) return -1;
				return 0;
			};
		}

		if (comparisonFunction === undefined) throw new TypeError('Input needs to be a string or array');
		if (stringOrArray.length === 0) throw new RangeError('Input must be non-empty');


		const suffixes: [number, number, string | number[]][] = [];

		for (let i = stringOrArray.length - 1; i >= 0; i--) {
			suffixes.push([i, 0, stringOrArray.slice(i)]);
		}

		suffixes.sort(comparisonFunction);

		for (let i = stringOrArray.length - 1; i > 0; i--) {
			let matchCount = 0;
			let suffixLength = suffixes[i - 1][2].length;

			for (let elementIndex = 0; elementIndex < suffixLength; elementIndex++) {
				if (suffixes[i - 1][2][elementIndex] === suffixes[i][2][elementIndex]) {
					matchCount++;
				} else {
					break;
				}
			}

			suffixes[i][1] = matchCount;
		}


		this._original = stringOrArray;
		this._lcpArray = suffixes.map(([suffixIndex, lcp]) => [suffixIndex, lcp]);
	}


	/**
	 * Get the Longest Common Prefix Array
	 * The first item is the index of the suffix in the original string.
	 * The second item is the number of characters in common with the previous suffix in the array.
	 * O(1)
	 * @returns {[number, number][]}
	 */
	getLongestCommonPrefixArray(): [number, number][] {
		return this._lcpArray;
	}


	/**
	 * Get original input value. O(1)
	 * @returns {string | number[]}
	 */
	getOriginalInput(): string | number[] {
		return this._original;
	}


	/**
	 * Get the suffix from the original input given a starting index. O(n)
	 * @param {number} start Start index of suffix in original input
	 * @returns {string}
	 */
	getSuffix(start: number): string | number[] {
    if (typeof start !== 'number') throw new TypeError('Index needs to be a number.');
    if (start >= this._original.length || start < 0) throw new RangeError('Index out of range.');
		return this._original.slice(start);
	}


  /**
   * Iterator to allow looping.
   */
	 *[Symbol.iterator](): Iterator<[number, number]> {
    for (const value of this._lcpArray) {
      yield value;
    }
  }
}