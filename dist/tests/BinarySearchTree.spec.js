import { BinarySearchTree } from "../index.js";
import { ok } from 'assert';
describe('Test Binary Search Tree', () => {
    it('Should initialize correctly', () => {
        const bst = new BinarySearchTree();
        ok(bst.size() === 0);
    });
    it('Should correctly add nodes to tree', () => {
        const bst = new BinarySearchTree();
        bst.add(10).add(1).add(5).add(0).add(11).add(13);
        ok(bst.size() === 6);
        ok(bst.find(13) === 13);
        ok(bst.find(100) === undefined);
    });
    it('Should correctly remove nodes from tree', () => {
        const bst = new BinarySearchTree();
        bst.add(10);
        ok(bst.remove(10) === 10);
        ok(bst.size() === 0);
        bst.add(10).add(1).add(5).add(0).add(12).add(13).add(11).add(-1).add(2).add(6);
        ok(bst.remove(100) === undefined);
        ok(bst.size() === 10);
        // initial tree
        let expectedResults = [5, 0, 12, -1, 1, 10, 13, 2, 6, 11];
        let i = 0;
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
        // both undefined
        expectedResults = [5, 0, 12, -1, 1, 10, 13, 2, 6];
        i = 0;
        ok(bst.remove(11) === 11);
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
        // right undefined
        expectedResults = [5, 0, 12, -1, 1, 6, 13, 2];
        i = 0;
        ok(bst.remove(10) === 10);
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
        // left undefined, right contains subtree
        expectedResults = [5, 0, 12, -1, 2, 6, 13];
        i = 0;
        ok(bst.remove(1) === 1);
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
        // both defined
        expectedResults = [5, 0, 13, -1, 2, 6];
        i = 0;
        ok(bst.remove(12) === 12);
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
        expectedResults = [6, 0, 13, -1, 2];
        i = 0;
        ok(bst.remove(5) === 5);
        ok(bst.size() === expectedResults.length);
        for (const value of bst.levelOrderTraversal()) {
            ok(value === expectedResults[i]);
            i++;
        }
    });
    it('Should correctly clear tree', () => {
        const bst = new BinarySearchTree();
        bst.add(10).add(1).add(5).add(0).add(11).add(13);
        ok(bst.size() === 6);
        bst.clear();
        ok(bst.size() === 0);
        ok(bst.find(10) === undefined);
    });
    it('Should correctly traverse tree in preorder', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [5, 1, 0, 11, 10, 13];
        let i = 0;
        bst.add(10).add(1).add(5).add(0).add(11).add(13);
        for (const nodeValue of bst.preOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly traverse tree in order', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [1, 3, 5, 6, 8, 11, 12, 13, 14, 15, 17, 19];
        let i = 0;
        bst.add(11).add(6).add(15).add(3).add(8).add(13).add(17).add(1).add(5).add(12).add(14).add(19);
        for (const nodeValue of bst.inOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly traverse tree in postorder', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [1, 5, 3, 8, 6, 12, 14, 13, 19, 17, 15, 11];
        let i = 0;
        bst.add(11).add(6).add(15).add(3).add(8).add(13).add(17).add(1).add(5).add(12).add(14).add(19);
        for (const nodeValue of bst.postOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly traverse tree in level order', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [5, 1, 11, 0, 10, 13];
        let i = 0;
        bst.add(10).add(1).add(5).add(0).add(11).add(13);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should treat object values correctly', () => {
        var _a, _b, _c, _d;
        const bst = new BinarySearchTree((a, b) => a.foo - b.foo);
        bst.add({ foo: 10 });
        bst.add({ foo: 1 });
        bst.add({ foo: 5 });
        const expectedResults = [5, 1, 10];
        let i = 0;
        for (const { foo: nodeValue } of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
        ok(bst.size() === 3);
        ok(((_a = bst.find({ foo: 5 })) === null || _a === void 0 ? void 0 : _a.foo) === 5);
        ok(((_b = bst.find({ foo: 100 })) === null || _b === void 0 ? void 0 : _b.foo) === undefined);
        ok(((_c = bst.remove({ foo: 5 })) === null || _c === void 0 ? void 0 : _c.foo) === 5);
        ok(((_d = bst.remove({ foo: 100 })) === null || _d === void 0 ? void 0 : _d.foo) === undefined);
        ok(bst.size() === 2);
    });
    it('Should replace value at node if key is the same', () => {
        var _a;
        const bst = new BinarySearchTree((a, b) => a.foo - b.foo);
        bst.add({ foo: 1, other: 'bob' });
        bst.add({ foo: 5, other: 'alice' });
        bst.add({ foo: 1, other: 'charlie' });
        ok(bst.size() === 2);
        ok(((_a = bst.find({ foo: 1 })) === null || _a === void 0 ? void 0 : _a.other) === 'charlie');
        const bst2 = new BinarySearchTree();
        bst2.add(10).add(1).add(5).add(0).add(11).add(13).add(10);
        ok(bst2.size() === 6);
    });
    it('Should error when given invalid parameters', () => {
        try {
            const bst = new BinarySearchTree(1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Should correctly balance right-right heavy tree', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [6, 5, 7];
        let i = 0;
        bst.add(5).add(6).add(7);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly balance left-left heavy tree', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [3, 2, 4];
        let i = 0;
        bst.add(4).add(3).add(2);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly balance right-left heavy tree', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [6, 5, 7];
        let i = 0;
        bst.add(5).add(7).add(6);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly balance left-right heavy tree', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [4, 3, 5];
        let i = 0;
        bst.add(5).add(3).add(4);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly add and balance more complicated tree', () => {
        const bst = new BinarySearchTree();
        const expectedResults = [5, 4, 7, 6, 8];
        let i = 0;
        bst.add(5).add(6).add(4).add(7).add(8);
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
    it('Should correctly delete and balance tree', () => {
        const bst = new BinarySearchTree();
        bst.add(10).add(5).add(20).add(3).add(8).add(15).add(25).add(30).add(1);
        bst.remove(15);
        let expectedResults = [10, 5, 25, 3, 8, 20, 30, 1];
        let i = 0;
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
        bst.remove(8);
        expectedResults = [10, 3, 25, 1, 5, 20, 30];
        i = 0;
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
        bst.add(19).add(32).add(0).add(29).add(31).add(33);
        expectedResults = [10, 3, 25, 1, 5, 20, 30, 0, 19, 29, 32, 31, 33];
        i = 0;
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
        bst.remove(30);
        expectedResults = [10, 3, 25, 1, 5, 20, 31, 0, 19, 29, 32, 33];
        i = 0;
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
        bst.remove(0);
        expectedResults = [25, 10, 31, 3, 20, 29, 32, 1, 5, 19, 33];
        i = 0;
        for (const nodeValue of bst.levelOrderTraversal()) {
            ok(expectedResults[i] === nodeValue);
            i++;
        }
    });
});
