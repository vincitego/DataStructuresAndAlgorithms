import { LongestCommonPrefix } from "../index.js";
/**
 * Finds all unique substrings of a given input string or array. O(nlogn)
 * @param {string | number[]} stringOrArray Input string
 * @returns {string[] | number[][]}
 */
export function uniqueSubstrings(stringOrArray) {
    if (typeof stringOrArray !== 'string' && !Array.isArray(stringOrArray))
        throw new TypeError('Input needs to be a string or array.');
    const lcp = new LongestCommonPrefix(stringOrArray);
    const results = [];
    for (const [suffixIndex, numRepeated] of lcp) {
        const substring = lcp.getSuffix(suffixIndex);
        for (let i = substring.length; i > numRepeated; i--) {
            results.push(substring.slice(0, i));
        }
    }
    return results;
}
