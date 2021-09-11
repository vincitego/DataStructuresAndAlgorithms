import { ok } from 'assert';
import { longestCommonElements } from "../index.js";


describe('Test Longest Common Substrings Algorithm', () => {

	it('Should output all longest common substrings', () => {
		const results = longestCommonElements(2, 'AABC', 'BCDE', 'BCDC', 'CDED');
		const expectedResults = ['BCD', 'CDE'];

		ok(results.length === expectedResults.length);
		
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(results[i] === expectedResults[i]);
		}
	});

	
	it('Should output empty array', () => {
		const results = longestCommonElements(3, 'a', 'b', 'b');
		ok(results.length === 0);
	});
	

	it('Should error when passing invalid parameters.', () => {
		try {
			const results = longestCommonElements('a' as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(1, '1');
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(2, '1');
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(-1, '1');
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(1, 1 as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(1, '');
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const results = longestCommonElements(1, String.fromCharCode(0));
			ok(false);
		} catch (error) {
			ok(true);
		}
	});


	it('Should output all longest common inputs when given array', () => {
		const results = longestCommonElements(2, [1, 1, 2, 3], [2, 3, 4, 5], [2, 3, 4, 3], [3, 4, 5, 4]);
		const expectedResults = [[2, 3, 4], [3, 4, 5]];

		ok(results.length === expectedResults.length);
		console.log(results);
		
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			for (let j = expectedResults.length - 1; j >= 0; j--) {
				ok(results[i][j] === expectedResults[i][j]);
			}
		}
	});

});