import { ok } from 'assert';
import { BinaryHeap } from '../index.js';
describe('Test Binary Heap', () => {
    it('Should correctly add nodes to min binary heap', () => {
        const bh = new BinaryHeap();
        bh.add(3);
        ok(bh.peek() === 3);
        ok(bh.size() === 1);
        bh.add(1);
        ok(bh.peek() === 1);
        ok(bh.size() === 2);
        bh.add(2);
        ok(bh.peek() === 1);
        ok(bh.size() === 3);
        bh.add(-1);
        ok(bh.peek() === -1);
        ok(bh.size() === 4);
        ok(bh.peekAt(0) === -1);
        ok(bh.peekAt(1) === 1);
        ok(bh.peekAt(2) === 2);
        ok(bh.peekAt(3) === 3);
    });
    it('Should correctly add nodes to max binary heap', () => {
    });
    it('Should correctly add nodes to binary heap with custom comparison', () => {
    });
    it('Should error out when peeking at invalid indexes', () => {
    });
    it('Should error out when not passing a function to constructor', () => {
    });
});
