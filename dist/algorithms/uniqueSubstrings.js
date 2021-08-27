import { LongestCommonPrefix } from "../index.js";
/**
 * Finds all unique substrings of a given input string.
 * @param {string} string Input string
 * @returns {string[]}
 */
export function uniqueSubstrings(string) {
    if (typeof string !== 'string')
        throw new TypeError('Input needs to be a string.');
    const lcp = new LongestCommonPrefix(string);
    const results = [];
    for (const [suffixIndex, numRepeated] of lcp) {
        const substring = lcp.getSuffix(suffixIndex);
        for (let i = substring.length; i > numRepeated; i--) {
            results.push(substring.slice(0, i));
        }
    }
    return results;
}
