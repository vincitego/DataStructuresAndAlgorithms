import { ok } from 'assert';
import { LongestCommonPrefix } from "../index.js";
describe('Test Longest Common Prefix', () => {
    it('New LongestCommonPrefix should be initialized correctly when passed a string', () => {
        const lcp = new LongestCommonPrefix('AZAZA');
        const lcpArray = lcp.getLongestCommonPrefixArray();
        const expectedResults = [[4, 0], [2, 1], [0, 3], [3, 0], [1, 2]];
        ok(lcp.getOriginalInput() === 'AZAZA');
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
    it('New LongestCommonPrefix should be initialized correctly when passed an array', () => {
        const input = [1, 2, 1, 2, 1];
        const lcp = new LongestCommonPrefix(input);
        const lcpArray = lcp.getLongestCommonPrefixArray();
        const getOriginalResult = lcp.getOriginalInput();
        const getSuffixResult = lcp.getSuffix(1);
        const expectedSuffix = [2, 1, 2, 1];
        const expectedLCP = [[4, 0], [2, 1], [0, 3], [3, 0], [1, 2]];
        ok(lcpArray.length === expectedLCP.length);
        for (let i = input.length - 1; i >= 0; i--) {
            ok(input[i] === getOriginalResult[i]);
        }
        for (let i = expectedSuffix.length - 1; i >= 0; i--) {
            ok(expectedSuffix[i] === getSuffixResult[i]);
        }
        for (let i = expectedLCP.length - 1; i >= 0; i--) {
            ok(lcpArray[i][0] === expectedLCP[i][0]);
            ok(lcpArray[i][1] === expectedLCP[i][1]);
        }
    });
    it('Creating LongestCommonPrefix with invalid parameters should error', () => {
        try {
            const lcp = new LongestCommonPrefix(1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const lcp = new LongestCommonPrefix('');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const lcp = new LongestCommonPrefix([]);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Passing invalid index to getSuffix should error', () => {
        const lcp = new LongestCommonPrefix('AZAZA');
        try {
            lcp.getSuffix(-1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            lcp.getSuffix(100);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            lcp.getSuffix('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
