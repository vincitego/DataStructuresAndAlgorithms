import { LongestCommonPrefix } from "../index.js";


/**
 * Find longest repeated substrings in a given input string. O(nlogn)
 * @param {string | number[]} stringOrArray Input string
 * @returns {string[] | number[][]}
 */
export function longestRepeatedSubstrings(stringOrArray: string | number[]): string[] | number[][] {
	if (typeof stringOrArray !== 'string' && !Array.isArray(stringOrArray)) throw new TypeError('Input needs to be a string or array.');

	const lcp = new LongestCommonPrefix(stringOrArray);
	let maxLength = 0;
	let results: string[] | number[][] = [];

	for (const [suffixIndex, numRepeated] of lcp) {
		if (numRepeated === 0) continue;

		if (numRepeated > maxLength) {
			maxLength = numRepeated;
			results = [stringOrArray.slice(suffixIndex, suffixIndex + numRepeated) as any];
		} else if (numRepeated === maxLength) {
			results.push(stringOrArray.slice(suffixIndex, suffixIndex + numRepeated) as any);
		}
	}

	return results;
}