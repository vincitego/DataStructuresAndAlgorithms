export class LongestCommonPrefix {
    /**
     * Suffix and Longest Common Prefix Array implementation. O(nlogn)
     * @param {string} stringOrArray String or array of values to build prefixes from.
     */
    constructor(stringOrArray) {
        let comparisonFunction;
        if (typeof stringOrArray === 'string') {
            comparisonFunction = (a, b) => {
                const subA = stringOrArray.slice(a[0]);
                const subB = stringOrArray.slice(b[0]);
                if (subA > subB)
                    return 1;
                if (subA === subB)
                    return 0;
                return -1;
            };
        }
        else if (Array.isArray(stringOrArray)) {
            comparisonFunction = (a, b) => {
                const subA = stringOrArray.slice(a[0]);
                const subB = stringOrArray.slice(b[0]);
                const minLength = Math.min(subA.length, subB.length);
                for (let i = 0; i < minLength; i++) {
                    if (subA[i] > subB[i])
                        return 1;
                    if (subA[i] < subB[i])
                        return -1;
                }
                if (subA.length > subB.length)
                    return 1;
                if (subA.length < subB.length)
                    return -1;
                return 0;
            };
        }
        if (comparisonFunction === undefined)
            throw new TypeError('Input needs to be a string or array');
        if (stringOrArray.length === 0)
            throw new RangeError('Input must be non-empty');
        const suffixes = [];
        for (let i = stringOrArray.length - 1; i >= 0; i--) {
            suffixes.push([i, 0]);
        }
        suffixes.sort(comparisonFunction);
        for (let i = stringOrArray.length - 1; i > 0; i--) {
            const previsouElement = stringOrArray.slice(suffixes[i - 1][0]);
            const currentElement = stringOrArray.slice(suffixes[i][0]);
            let matchCount = 0;
            let suffixLength = previsouElement.length;
            for (let elementIndex = 0; elementIndex < suffixLength; elementIndex++) {
                if (previsouElement[elementIndex] === currentElement[elementIndex]) {
                    matchCount++;
                }
                else {
                    break;
                }
            }
            suffixes[i][1] = matchCount;
        }
        this._original = stringOrArray;
        this._lcpArray = suffixes;
    }
    /**
     * Get the Longest Common Prefix Array
     * The first item is the index of the suffix in the original string.
     * The second item is the number of characters in common with the previous suffix in the array.
     * O(1)
     * @returns {[number, number][]}
     */
    getLongestCommonPrefixArray() {
        return this._lcpArray;
    }
    /**
     * Get original input value. O(1)
     * @returns {string | number[]}
     */
    getOriginalInput() {
        return this._original;
    }
    /**
     * Get the suffix from the original input given a starting index. O(n)
     * @param {number} start Start index of suffix in original input
     * @returns {string}
     */
    getSuffix(start) {
        if (typeof start !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (start >= this._original.length || start < 0)
            throw new RangeError('Index out of range.');
        return this._original.slice(start);
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        for (const value of this._lcpArray) {
            yield value;
        }
    }
}
