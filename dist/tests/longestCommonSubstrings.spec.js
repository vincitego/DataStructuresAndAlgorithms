import { ok } from 'assert';
import { longestCommonSubstrings } from "../index.js";
describe('Test Longest Common Substrings Algorithm', () => {
    it('Should output all longest common substrings', () => {
        const results = longestCommonSubstrings(2, 'AABC', 'BCDE', 'BCDC', 'CDED');
        const expectedResults = ['BCD', 'CDE'];
        ok(results.length === expectedResults.length);
        for (let i = expectedResults.length - 1; i >= 0; i--) {
            ok(results[i] === expectedResults[i]);
        }
    });
    it('Should output empty array', () => {
        const results = longestCommonSubstrings(3, 'a', 'b', 'b');
        ok(results.length === 0);
    });
    it('Should error when passing invalid parameters.', () => {
        try {
            const results = longestCommonSubstrings('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(1, '1');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(2, '1');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(-1, '1');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(1, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(1, '');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const results = longestCommonSubstrings(1, String.fromCharCode(0));
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
