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
            const results = longestRepeatedSubstrings(1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Should output all longest repeated substrings of given array', () => {
        const results = longestRepeatedSubstrings([1, 2, 1, 2, 2, 1, 1, 2, 1, 1]);
        const expectedResults = [[1, 2, 1], [2, 1, 1]];
        ok(results.length === expectedResults.length);
        for (let i = expectedResults.length - 1; i >= 0; i--) {
            for (let j = expectedResults.length - 1; j >= 0; j--) {
                ok(results[i][j] === expectedResults[i][j]);
            }
        }
    });
});
