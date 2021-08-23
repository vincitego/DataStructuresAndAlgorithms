import { ok } from 'assert';
import { DisjointSet } from '../index.js';
describe('Test Disjoint Set', () => {
    it('New disjoint set should be initialized correctly', () => {
        const ds = new DisjointSet();
        ok(ds.size() === 0);
        ok(ds.componentCount() === 0);
        ok(ds.componentSize(0) === 1);
    });
    it('Adding to disjoint set should work correctly', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 10; i++) {
            ds.add(i);
            ok(ds.peek(i) === i);
        }
        let i = 0;
        for (const value of ds) {
            ok(value === i);
            i++;
        }
        ok(ds.size() === 10);
        ok(ds.componentCount() === 10);
        ok(ds.componentSize(0) === 1);
        ok(ds.getRoot(5) === 5);
        ok(ds.getRootByValue(0) === 0);
        ok(ds.findIndex(9) === 9);
    });
    it('Disjoint set union correctly', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 10; i++) {
            ds.add(i);
        }
    });
    // getRootByValue(100)
    // unionByValue(0, 100)
    // unionByValue(100, 0)
    // union(-1, 0)
    // union(0, -1)
    // union(100, 0)
    // union(0, 100)
    // union(0, 0)
    // union('a' as any, 0)
    // union(0, 'a' as any)
    // peek('a' as any)
    // peek(-1)
    // peek(100)
    // findIndex(100)
    // componentSize(-1)
    // componentSize(100)
    // componentSize('a' as any)
});
