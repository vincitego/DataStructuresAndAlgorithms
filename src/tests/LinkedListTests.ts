import { describe, it } from 'mocha';
import { LinkedList } from "../index.js";
import { ok } from 'assert';



describe('Test Linked List', () => {
	const llEmpty = new LinkedList<number>();

	it('Should return size 0 for empty linked list.', () => {
		ok(llEmpty.size() === 0);
	});

	it('Should return undefined on peeking at empty linked list.', () => {
		ok(llEmpty.peekFront() === undefined);
	});
	
	it('Should return undefined when removing front node of empty linked list.', () => {
		ok(llEmpty.removeFront() === undefined);
	});


	const ll = new LinkedList<number>();
	ll.addBack(1).addBack(2).addBack(3);

	it('Should return size 3.', () => {
		ok(ll.size() === 3);
	});

	it('Should return 1 on peeking at linked list.', () => {
		ok(ll.peekFront() === 1);
	});
	
	it('Should return 1 when removing front node of linked list.', () => {
		ok(ll.removeFront() === 1);
	});

	it('Should return size 2 after removing a node from linked list.', () => {
		ok(ll.size() === 2);
	});

	it('Should return 2 on peeking at linked list after removing first node.', () => {
		ok(ll.peekFront() === 2);
	});


	const llFrom = LinkedList.from([7, 8, 9, 10]);

	it('Should return size 4.', () => {
		ok(llFrom.size() === 4);
	});

	it('Should return 7 on peeking at linked list.', () => {
		ok(llFrom.peekFront() === 7);
	});

	it('Should return string 78910 after for of loop of linked list.', () => {
		let strValues = '';

		for (const nodeValue of llFrom) {
			strValues += nodeValue;
		}

		ok(strValues === '78910');
	});
});