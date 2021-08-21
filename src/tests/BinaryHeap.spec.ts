import { ok } from 'assert';
import { BinaryHeap } from '../index.js';
import { defaultMaxCompare } from '../utility/utility.js';

describe('Test Binary Heap', () => {

	it('Should correctly add nodes to min binary heap', () => {
		const bh = new BinaryHeap<number>();
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

	
	it('Should correctly poll nodes from binary heap', () => {
		const bh = new BinaryHeap<number>();
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
		const bh = new BinaryHeap<number>(defaultMaxCompare);
		bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);

		ok(bh.poll() === 15);
		ok(bh.poll() === 13);
	});

	
	it('Should correctly add nodes to binary heap with custom comparison', () => {
		const bh = new BinaryHeap<{foo: number}>((a, b) => {
			if (a.foo < b.foo) return -1;
			if (a.foo > b.foo) return 1;
			return 0;
		});

		bh.add({foo: 1});
		bh.add({foo: 5});
		bh.add({foo: 1});
		
		ok(bh.poll()!.foo === 1);
		ok(bh.poll()!.foo === 1);
		ok(bh.poll()!.foo === 5);
	});

	
	it('Should error out when peeking at invalid indexes', () => {
		const bh = new BinaryHeap<number>();
		
		try {
			bh.peekAt('a' as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			bh.peekAt(-1);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			bh.peekAt(0);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

	
	it('Should error out when not passing a function to constructor', () => {
		try {
			const	bh = new BinaryHeap<number>('a' as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});


	it('Should clear the heap', () => {
		const bh = new BinaryHeap<number>();
		bh.add(3);
		ok(bh.size() === 1);
		bh.clear();
		ok(bh.size() === 0);
	});

	
	it('Should correctly find value in middle of heap', () => {
		const bh = new BinaryHeap<number>();
		bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);
		ok(bh.findIndex(12) === 8);
	});

	
	it('Should correctly find object in middle of heap', () => {
		const bh = new BinaryHeap<{foo: number}>((a, b) => {
			if (a.foo < b.foo) return -1;
			if (a.foo > b.foo) return 1;
			return 0;
		});

		bh.add({foo: 1});
		bh.add({foo: 5});
		bh.add({foo: 1});

		ok(bh.findIndex(node => node.foo === 5) === 1);
	});

	
	it('Should correctly remove at middle of heap', () => {
		const bh = new BinaryHeap<number>();
		bh.add(1).add(5).add(1).add(8).add(6).add(2).add(2).add(13).add(12).add(11).add(7).add(2).add(15).add(3).add(10);

		ok(bh.removeAt(4) === 6);
		ok(bh.peekAt(4) === 7);
		ok(bh.peekAt(10) === 10);

		ok(bh.removeAt(7) === 13);
		ok(bh.peekAt(1) === 3);
		ok(bh.peekAt(3) === 5);
		ok(bh.peekAt(7) === 8)

		ok(bh.size() === 13);
	});

});