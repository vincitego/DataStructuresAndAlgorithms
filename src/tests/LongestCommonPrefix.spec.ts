import { ok } from 'assert';
import { LongestCommonPrefix } from "../index.js";


describe('Test Longest Common Prefix', () => {

	it('New LongestCommonPrefix should be initialized correctly', () => {
		const lcp = new LongestCommonPrefix('AZAZA');
		const lcpArray = lcp.getLongestCommonPrefixArray();
		const expectedResults = [[4, 0], [2, 1], [0, 3], [3, 0], [1, 2]];
		
		ok(lcp.getString() === 'AZAZA');
		ok(lcp.getSuffix(1) === 'ZAZA');
		ok(lcpArray.length === expectedResults.length);
		
		for (let i = 0; i < expectedResults.length; i++) {
			ok(lcpArray[i][0] === expectedResults[i][0]);
			ok(lcpArray[i][1] === expectedResults[i][1]);
		}

		let i = 0;
		for (const [suffixIndex, numCommon] of lcp) {
			ok(suffixIndex === expectedResults[i][0]);
			ok(numCommon === expectedResults[i][1]);
			i++;
		}
	});


	it('Creating LongestCommonPrefix without passing string should error', () => {
		try {
			const lcp = new LongestCommonPrefix(1 as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});


	it('Passing invalid index to getSuffix should error', () => {
		const lcp = new LongestCommonPrefix('AZAZA');

		try {
			lcp.getSuffix(-1);
			ok(false);
		} catch (error) {
			ok(true);
		}

		try {
			lcp.getSuffix(100);
			ok(false);
		} catch (error) {
			ok(true);
		}

		try {
			lcp.getSuffix('a' as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

});