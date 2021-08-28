import { LongestCommonPrefix } from "../index.js";


/**
 * Find longest common substrings present in at least n given input strings. O(nlogn)
 * @param {number} numPresent How many input strings must the substring be present in to be eligible. Default 0 means the substring must be present in all given input strings.
 * @param {string} strings Any number of input strings
 * @returns {string[]}
 */
export function longestCommonSubstrings(numPresent: number = 0, ...strings: string[]): string[] {
	const numStrings = strings.length;

	if (typeof numPresent !== 'number') throw new TypeError('numPresent needs to be a number.');
	if (numStrings < 2) throw new RangeError('There needs to be at least 2 input strings.');
	if (numPresent > numStrings) throw new RangeError('numPresent needs to be less than or equal to the number of input strings.');
	if (numPresent < -1) throw new RangeError('numPresent needs to be greater than or equal to 0.');


	if (numPresent === 0) numPresent = numStrings;

	const colorIndexes: number[] = [];
	const colorTracker: number[] = new Array(numStrings).fill(0);
	let colorIndex = 0;
	let concatString = '';
	let maxSentinel = String.fromCharCode(255);


	for (let i = numStrings - 1; i >= 0; i--) {
		const string = strings[i];

		if (typeof string !== 'string') throw new TypeError('Inputs must be of type string.');
		if (string.length === 0) throw new TypeError('Input strings must be nonempty.');

		for (const char of string) {
			if (char < maxSentinel) maxSentinel = char;
		}

		concatString += string + String.fromCharCode(i);
		colorIndex += string.length + 1;
		colorIndexes.push(colorIndex);
	}

	if (numStrings >= maxSentinel.charCodeAt(0)) throw new EvalError('Too many input strings, the number of available sentinel characters based on string content have been exceeded. Reduce the number of input strings or remove small char code characters from the input strings.')


	const concatStringLength = concatString.length;
	const lcp = new LongestCommonPrefix(concatString);
	const lcpArray = lcp.getLongestCommonPrefixArray();
	let windowStart = numStrings;
	let windowEnd = numStrings;
	let maxLength = 0;
	let results = new Set<string>();
	let previousColor = getColor(lcpArray[windowStart][0], colorIndexes)
	colorTracker[previousColor] = 1;
	
	while (true) {
		if (windowEnd >= lcpArray.length - 1) break;
		const colorCount = colorTracker.filter(numColor => numColor > 0).length;

		if (colorCount < numPresent) {
			windowEnd++;
			colorTracker[getColor(lcpArray[windowEnd][0], colorIndexes)]++;

		} else {
			let minCommon = concatStringLength;

			for (let i = windowStart + 1; i <= windowEnd; i++) {
				if (lcpArray[i][1] < minCommon) minCommon = lcpArray[i][1];
			}

			if (minCommon > maxLength) {
				results.clear();
				maxLength = minCommon;
			}

			if (minCommon > 0 && minCommon === maxLength) {
				for (let i = windowStart + 1; i <= windowEnd; i++) {
					if (minCommon === maxLength) {
						const startIndex = lcpArray[i][0];
						const endIndex = startIndex + minCommon;
						const substring = concatString.slice(startIndex, endIndex);
						results.add(substring);
					}
				}
			}

			windowStart++;
			const newColor = getColor(lcpArray[windowStart][0], colorIndexes);
			colorTracker[previousColor]--;
			previousColor = newColor;

		}
	}

	return Array.from(results);
}


function getColor(index: number, colorIndexes: number[]): number {
	return colorIndexes.findIndex(colorIndex => index < colorIndex);
}