import { LongestCommonPrefix } from "../index.js";
/**
 * Find longest repeated substrings in a given input string.
 * @param {string} string Input string
 * @returns {string[]}
 */
export function longestRepeatedSubstrings(string) {
    if (typeof string !== 'string')
        throw new TypeError('Input needs to be a string.');
    const lcp = new LongestCommonPrefix(string);
    let maxLength = 0;
    let results = [];
    for (const [suffixIndex, numRepeated] of lcp) {
        if (numRepeated === 0)
            continue;
        if (numRepeated > maxLength) {
            maxLength = numRepeated;
            results = [string.slice(suffixIndex, suffixIndex + numRepeated)];
        }
        else if (numRepeated === maxLength) {
            results.push(string.slice(suffixIndex, suffixIndex + numRepeated));
        }
    }
    return results;
}
