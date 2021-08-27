export class LongestCommonPrefix {
    /**
     * Suffix and Longest Common Prefix Array implementation. O(nlogn)
     * @param {string} string String to build arrays from.
     */
    constructor(string) {
        if (typeof string !== 'string')
            throw new TypeError('Input needs to be a string');
        const suffixes = [];
        let substring = '';
        // rewrite this as a binary search tree for efficiency?
        for (let i = string.length - 1; i >= 0; i--) {
            substring = string[i] + substring;
            suffixes.push([i, 0, substring]);
        }
        suffixes.sort((a, b) => {
            if (a[2] > b[2])
                return 1;
            return -1;
        });
        for (let i = string.length - 1; i > 0; i--) {
            let matchCount = 0;
            let suffixLength = suffixes[i - 1][2].length;
            for (let letterIndex = 0; letterIndex < suffixLength; letterIndex++) {
                if (suffixes[i - 1][2][letterIndex] === suffixes[i][2][letterIndex]) {
                    matchCount++;
                }
                else {
                    break;
                }
            }
            suffixes[i][1] = matchCount;
        }
        this._string = string;
        this._lcpArray = suffixes.map(([suffixIndex, lcp]) => [suffixIndex, lcp]);
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
     * Get original string. O(1)
     * @returns {string}
     */
    getString() {
        return this._string;
    }
    /**
     * Get the suffix from the original string given a starting index. O(n)
     * @param {number} index Start index of suffix in original string
     * @returns {string}
     */
    getSuffix(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index >= this._string.length || index < 0)
            throw new RangeError('Index out of range.');
        return this._string.substring(index);
    }
}
