import { LongestCommonPrefix } from "../index.js";


export function longestCommonElements(numPresent: number = 0, ...inputs: string[] | number[][]): string[] | number[][] {
	const numInputs = inputs.length;

	if (typeof numPresent !== 'number') throw new TypeError('numPresent needs to be a number.');
	if (numInputs < 2) throw new RangeError('There needs to be at least 2 inputs.');
	if (numPresent > numInputs) throw new RangeError('numPresent needs to be less than or equal to the number of inputs.');
	if (numPresent < 0) throw new RangeError('numPresent needs to be greater than or equal to 0.');

	if (typeof inputs[0] === 'string') {
		return longestCommonSubstrings(numPresent || numInputs, ...inputs as any);
	} else if (Array.isArray(inputs[0])) {
		return longestCommonSubarrays(numPresent || numInputs, ...inputs as any);
	} else {
		throw new TypeError('Inputs must be of type string or array.');
	}
}


/**
 * Find longest common substrings present in at least n given input strings. O(nlogn)
 * @param {number} numPresent How many input strings must the substring be present in to be eligible. Default 0 means the substring must be present in all given input strings.
 * @param {string} strings Any number of input strings
 * @returns {string[]}
 */
function longestCommonSubstrings(numPresent: number = 0, ...strings: string[]): string[] {
	const numStrings = strings.length;
	const colorIndexes: number[] = [];
	const colorTracker: number[] = new Array(numStrings).fill(0);
	let colorIndex = 0;
	let concatString = '';
	let maxSentinel = String.fromCharCode(255);


	for (let i = 0; i < numStrings; i++) {
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
		const colorCount = colorTracker.filter(numColor => numColor > 0).length;

		if (colorCount < numPresent) {
			windowEnd++;
			if (windowEnd === lcpArray.length) break;
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


/**
 * Find longest common subarrays present in at least n given input arrays. O(nlogn)
 * @param {number} numPresent How many input arrays must the subarray be present in to be eligible. Default 0 means the subarray must be present in all given input arrays.
 * @param {number[]} arrays Any number of input arrays
 * @returns {number[][]}
 */
 function longestCommonSubarrays(numPresent: number = 0, ...arrays: number[][]): number[][] {
	const numInputs = arrays.length;
	const colorIndexes: number[] = [];
	const colorTracker: number[] = new Array(numInputs).fill(0);
	let concatInput: number[] = [];
	let colorIndex = 0;


	for (let i = 0; i < numInputs; i++) {
		const input = arrays[i];

		if (!Array.isArray(input)) throw new TypeError('Input must be of type array.');
		if (input.length === 0) throw new TypeError('Input array must be nonempty.');

		concatInput = concatInput.concat(...input.map(value => {
			if (typeof value !== 'number') throw new TypeError('Input must be an array of numbers.');
			if (value < 0) throw new RangeError('Input must be an array of positive numbers.');
			return value + numInputs;
		}), i);

		colorIndex += input.length + 1;
		colorIndexes.push(colorIndex);
	}


	const concatInputLength = concatInput.length;
	const lcp = new LongestCommonPrefix(concatInput);
	const lcpArray = lcp.getLongestCommonPrefixArray();
	let windowStart = numInputs;
	let windowEnd = numInputs;
	let maxLength = 0;
	let results = new Map<string, number[]>();
	let previousColor = getColor(lcpArray[windowStart][0], colorIndexes);
	colorTracker[previousColor] = 1;
	
	while (true) {
		const colorCount = colorTracker.filter(numColor => numColor > 0).length;

		if (colorCount < numPresent) {
			windowEnd++;
			if (windowEnd === lcpArray.length) break;
			colorTracker[getColor(lcpArray[windowEnd][0], colorIndexes)]++;

		} else {
			let minCommon = concatInputLength;

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
						const subarray = concatInput.slice(startIndex, endIndex);
						results.set(subarray.join(','), subarray);
					}
				}
			}

			windowStart++;
			const newColor = getColor(lcpArray[windowStart][0], colorIndexes);
			colorTracker[previousColor]--;
			previousColor = newColor;

		}
	}

	return Array.from(results.values())
		.map(result => result.map(value => value - numInputs));
}


function getColor(index: number, colorIndexes: number[]): number {
	return colorIndexes.findIndex(colorIndex => index < colorIndex);
}