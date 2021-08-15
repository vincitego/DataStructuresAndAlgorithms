import { describe, it } from 'mocha';
import { LinkedList } from "../index.js";
import { ok } from 'assert';
describe('Test Linked List', () => {
    it('Should return size 0 and undefined values for empty linked list.', () => {
        const ll = new LinkedList();
        ok(ll.size() === 0);
        ok(ll.peekFront() === undefined);
        ok(ll.peekBack() === undefined);
        ok(ll.peekAt(0) === undefined);
        ok(ll.removeFront() === undefined);
    });
    it('Should generate Linked List from an array.', () => {
        const ll = LinkedList.from([7, 8, 9, 10]);
        ok(ll.size() === 4);
        ok(ll.peekFront() === 7);
        ok(ll.peekBack() === 10);
        ok(ll.peekAt(2) === 9);
    });
    it('Should iterate Linked List correctly.', () => {
        const ll = LinkedList.from([7, 8, 9, 10]);
        let strValues = '';
        for (const nodeValue of ll) {
            strValues += nodeValue;
        }
        ok(strValues === '78910');
    });
    it('Should add 1 node after adding calling addBack', () => {
        const ll = new LinkedList();
        ll.addBack(1);
        ok(ll.size() === 1);
        ok(ll.peekFront() === 1);
        ok(ll.peekBack() === 1);
        ok(ll.peekAt(0) === 1);
        ok(ll.removeFront() === 1);
        ok(ll.size() === 0);
    });
    it('Should add node with value 8 to front of linked list.', () => {
        const ll = new LinkedList();
        ll.addBack(1);
        ll.addFront(8);
        ok(ll.size() === 2);
        ok(ll.peekFront() === 8);
        ok(ll.peekBack() === 1);
        ok(ll.peekAt(1) === 1);
    });
    it('Should correctly reorder after removing a node from linked list.', () => {
        const ll = new LinkedList();
        ll.addBack(1);
        ll.addBack(2);
        ll.addBack(3);
        ll.removeAt(1);
        ok(ll.size() === 2);
        ok(ll.peekFront() === 1);
        ok(ll.peekBack() === 3);
        ok(ll.peekAt(1) === 3);
    });
    it('Should correctly clear linked list after calling clear().', () => {
        const ll = new LinkedList();
        ll.addBack(1);
        ll.addBack(8);
        ll.clear();
        ok(ll.size() === 0);
        ok(ll.peekFront() === undefined);
        ok(ll.peekBack() === undefined);
        ok(ll.peekAt(0) === undefined);
        ok(ll.removeFront() === undefined);
    });
    it('Should return undefined when peeking at negative or out of range index.', () => {
        const ll = new LinkedList();
        ok(ll.peekAt(-1) === undefined);
        ok(ll.peekAt(0) === undefined);
    });
    it('Should error when removing at negative or out of range index.', () => {
        const ll = new LinkedList();
        try {
            ll.removeAt(-1) === undefined;
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ll.removeAt(0) === undefined;
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Should return size 0 after removing last node.', () => {
        const ll = new LinkedList();
        ll.addBack(1);
        ll.addBack(2);
        ll.removeFront();
        ll.removeFront();
        ok(ll.size() === 0);
        ok(ll.peekFront() === undefined);
        ok(ll.peekBack() === undefined);
        ok(ll.peekAt(0) === undefined);
        ok(ll.removeFront() === undefined);
    });
    it('Should correctly add new node in middle of linked list.', () => {
        const ll = new LinkedList();
        ll.addAt(0, 1);
        ll.addAt(1, 2);
        ll.addAt(1, 3);
        ok(ll.size() === 3);
        ok(ll.peekFront() === 1);
        ok(ll.peekBack() === 2);
        ok(ll.peekAt(1) === 3);
    });
});
