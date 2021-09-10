import { ok } from 'assert';
import { IndexedPriorityQueue } from '../index.js';
describe('Test Indexed Priority Queue', () => {
    it('Should correctly add nodes to min indexed priority queue', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 3);
        ok(bh.peek() === 3);
        ok(bh.size() === 1);
        bh.add(1, 1);
        ok(bh.peek() === 1);
        ok(bh.size() === 2);
        bh.add(2, 2);
        ok(bh.peek() === 1);
        ok(bh.size() === 3);
        bh.add(3, -1);
        ok(bh.peek() === -1);
        ok(bh.size() === 4);
    });
    it('Should correctly poll nodes from binary heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 1)
            .add(1, 5)
            .add(2, 1)
            .add(3, 8)
            .add(4, 6)
            .add(5, 2)
            .add(6, 2)
            .add(7, 13)
            .add(8, 12)
            .add(9, 11)
            .add(10, 7)
            .add(11, 2)
            .add(12, 15)
            .add(13, 3)
            .add(14, 10);
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
    it('Should correctly add nodes to binary heap with custom comparison', () => {
        const bh = new IndexedPriorityQueue((a, b) => {
            if (a.foo < b.foo)
                return -1;
            if (a.foo > b.foo)
                return 1;
            return 0;
        });
        bh.add(1, { foo: 1 });
        bh.add(2, { foo: 5 });
        bh.add(3, { foo: 1 });
        ok(bh.poll().foo === 1);
        ok(bh.poll().foo === 1);
        ok(bh.poll().foo === 5);
    });
    it('Should error out when not passing a function to constructor', () => {
        try {
            const bh = new IndexedPriorityQueue('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Should clear the heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 3);
        ok(bh.size() === 1);
        bh.clear();
        ok(bh.size() === 0);
    });
    it('Should correctly find or not find values in heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 1)
            .add(1, 5)
            .add(2, 1)
            .add(3, 8)
            .add(4, 6)
            .add(5, 2)
            .add(6, 2)
            .add(7, 13)
            .add(8, 12)
            .add(9, 11)
            .add(10, 7)
            .add(11, 2)
            .add(12, 15)
            .add(13, 3)
            .add(14, 10);
        ok(bh.get(8) === 12);
        ok(bh.get(100) === undefined);
    });
    it('Should correctly find object in middle of heap', () => {
        var _a, _b;
        const bh = new IndexedPriorityQueue((a, b) => {
            if (a.foo < b.foo)
                return -1;
            if (a.foo > b.foo)
                return 1;
            return 0;
        });
        bh.add(0, { foo: 1 });
        bh.add(1, { foo: 5 });
        bh.add(2, { foo: 1 });
        ok(((_a = bh.get(1)) === null || _a === void 0 ? void 0 : _a.foo) === 5);
        ok(((_b = bh.get(100)) === null || _b === void 0 ? void 0 : _b.foo) === undefined);
    });
    it('Should correctly remove values from heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 1)
            .add(1, 5)
            .add(2, 1)
            .add(3, 8)
            .add(4, 6)
            .add(5, 2)
            .add(6, 2)
            .add(7, 4)
            .add(8, 12)
            .add(9, 11)
            .add(10, 7)
            .add(11, 2)
            .add(12, 15)
            .add(13, 3)
            .add(14, 10);
        ok(bh.remove(7) === 4);
        ok(bh.remove(10) === 7);
        ok(bh.remove(5) === 2);
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
    it('Should correctly update values in heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 1)
            .add(1, 5)
            .add(2, 1)
            .add(3, 8)
            .add(4, 6)
            .add(5, 2)
            .add(6, 2)
            .add(7, 13)
            .add(8, 12)
            .add(9, 11)
            .add(10, 7)
            .add(11, 2)
            .add(12, 15)
            .add(13, 3)
            .add(14, 10);
        bh.update(14, 4);
        ok(bh.poll() === 1);
        ok(bh.poll() === 1);
        ok(bh.poll() === 2);
        ok(bh.poll() === 2);
        ok(bh.poll() === 2);
        ok(bh.poll() === 3);
        ok(bh.poll() === 4);
        ok(bh.poll() === 5);
        ok(bh.poll() === 6);
        ok(bh.poll() === 7);
        ok(bh.poll() === 8);
        ok(bh.poll() === 11);
        ok(bh.poll() === 12);
        ok(bh.poll() === 13);
        ok(bh.poll() === 15);
        ok(bh.poll() === undefined);
    });
    it('Should correctly return array of keys in heap', () => {
        const bh = new IndexedPriorityQueue();
        bh.add(0, 1)
            .add(1, 5)
            .add(2, 1)
            .add(3, 8)
            .add(4, 6)
            .add(5, 2)
            .add(6, 2)
            .add(7, 13)
            .add(8, 12)
            .add(9, 11)
            .add(10, 7)
            .add(11, 2)
            .add(12, 15)
            .add(13, 3)
            .add(14, 10);
        ok(bh.remove(7) === 13);
        ok(bh.remove(10) === 7);
        ok(bh.remove(5) === 2);
        const expectedKeys = [0, 1, 2, 3, 4, 6, 8, 9, 11, 12, 13, 14];
        const keys = bh.keys();
        ok(keys.length === expectedKeys.length);
        for (let i = keys.length - 1; i >= 0; i--) {
            ok(keys[i] === expectedKeys[i]);
        }
    });
});
