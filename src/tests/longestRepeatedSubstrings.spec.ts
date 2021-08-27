import { ok } from 'assert';
import { longestRepeatedSubstrings } from "../index.js";


describe('Test Longest Repeated Substrings Algorithm', () => {

	it('Should output all longest repeated substrings of ABRACADABRA', () => {
		const results = longestRepeatedSubstrings('ABRACADABRA');
		const expectedResults = ['ABRA'];

		ok(results.length === expectedResults.length);
		
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(results[i] === expectedResults[i]);
		}
	});


	it('Should output all longest repeated substrings of ABABBAABAA', () => {
		const results = longestRepeatedSubstrings('ABABBAABAA');
		const expectedResults = ['ABA', 'BAA'];

		ok(results.length === expectedResults.length);
		
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(results[i] === expectedResults[i]);
		}
	});

	
	it('Should output empty array for string ABCD', () => {
		const results = longestRepeatedSubstrings('ABCD');
		ok(results.length === 0);
	});
	

	it('Should error when not passing a string.', () => {
		try {
			const results = longestRepeatedSubstrings(1 as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

});