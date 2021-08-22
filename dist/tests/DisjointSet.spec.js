import { ok } from 'assert';
import { DisjointSet } from '../index.js';
describe('Test Disjoint Set', () => {
    it('New disjoint set should be initialized correctly', () => {
        const ds = new DisjointSet(10);
        ok(ds.size() === 10);
        ok(ds.componentCount() === 10);
        ok(ds.componentSize(0) === 1);
        ok(ds.find(5) === 5);
    });
    it('Should error out on trying to create invalid disjoint set', () => {
        try {
            const ds = new DisjointSet(1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const ds = new DisjointSet('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
