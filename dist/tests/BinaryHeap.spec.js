import { ok } from 'assert';
import { BinaryHeap } from '../index.js';
import { defaultMaxCompare } from '../utility/utility.js';
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
    });
    it('Should correctly poll nodes from binary heap', () => {
        const bh = new BinaryHeap();
        bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);
        ok(bh.poll() === 1);
        ok(bh.poll() === 1);
        ok(bh.poll() === 2);
        ok(bh.poll() === 2);
        ok(bh.poll() === 2);
        ok(bh.poll() === 3);
        ok(bh.poll() === 5);
        ok(bh.poll() === 6);
        ok(bh.poll() === 7);
        ok(bh.poll() === 8);
        ok(bh.poll() === 10);
        ok(bh.poll() === 11);
        ok(bh.poll() === 12);
        ok(bh.poll() === 13);
        ok(bh.poll() === 15);
        ok(bh.poll() === undefined);
    });
    it('Should correctly add nodes to max binary heap', () => {
        const bh = new BinaryHeap(defaultMaxCompare);
        bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);
        ok(bh.poll() === 15);
        ok(bh.poll() === 13);
    });
    it('Should correctly add nodes to binary heap with custom comparison', () => {
        const bh = new BinaryHeap((a, b) => {
            if (a.foo < b.foo)
                return -1;
            if (a.foo > b.foo)
                return 1;
            return 0;
        });
        bh.add({ foo: 1 });
        bh.add({ foo: 5 });
        bh.add({ foo: 1 });
        ok(bh.poll().foo === 1);
        ok(bh.poll().foo === 1);
        ok(bh.poll().foo === 5);
    });
    it('Should error out when not passing a function to constructor', () => {
        try {
            const bh = new BinaryHeap('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Should clear the heap', () => {
        const bh = new BinaryHeap();
        bh.add(3);
        ok(bh.size() === 1);
        bh.clear();
        ok(bh.size() === 0);
    });
    it('Should correctly find or not find values in heap', () => {
        const bh = new BinaryHeap();
        bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);
        ok(bh.find(12) === 12);
        ok(bh.find(100) === undefined);
    });
    it('Should correctly find object in middle of heap', () => {
        var _a, _b;
        const bh = new BinaryHeap((a, b) => {
            if (a.foo < b.foo)
                return -1;
            if (a.foo > b.foo)
                return 1;
            return 0;
        });
        bh.add({ foo: 1 });
        bh.add({ foo: 5 });
        bh.add({ foo: 1 });
        ok(((_a = bh.find({ foo: 5 })) === null || _a === void 0 ? void 0 : _a.foo) === 5);
        ok(((_b = bh.find({ foo: 100 })) === null || _b === void 0 ? void 0 : _b.foo) === undefined);
    });
    it('Should correctly remove values from heap', () => {
        const bh = new BinaryHeap();
        bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(4).add(12).add(11).add(7).add(2).add(15).add(3).add(10);
        ok(bh.remove(4) === 4);
        ok(bh.remove(7) === 7);
        ok(bh.remove(2) === 2);
        ok(bh.size() === 12);
        ok(bh.poll() === 1);
        ok(bh.poll() === 1);
        ok(bh.poll() === 2);
        ok(bh.poll() === 2);
        ok(bh.poll() === 3);
        ok(bh.poll() === 5);
        ok(bh.poll() === 6);
        ok(bh.poll() === 8);
        ok(bh.poll() === 10);
        ok(bh.poll() === 11);
        ok(bh.poll() === 12);
        ok(bh.poll() === 15);
    });
});
