import { ok } from 'assert';
import { uniqueSubstrings } from "../index.js";
describe('Test Unique Substrings Algorithm', () => {
    it('Should output all unique substrings of AZAZA', () => {
        const results = uniqueSubstrings('AZAZA');
        const expectedResults = ['A', 'AZA', 'AZ', 'AZAZA', 'AZAZ', 'ZA', 'Z', 'ZAZA', 'ZAZ'];
        ok(results.length === expectedResults.length);
        for (let i = expectedResults.length - 1; i >= 0; i--) {
            ok(results[i] === expectedResults[i]);
        }
    });
    it('Should error when not passing a string.', () => {
        try {
            const results = uniqueSubstrings(1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
