import { BinarySearchTree } from "../index.js";
import { ok } from 'assert';


describe('Test Binary Search Tree', () => {

	it('Should initialize correctly', () => {
		const bst = new BinarySearchTree<number>();
		ok(bst.size() === 0);
	});


	it('Should correctly add nodes to tree', () => {
		const bst = new BinarySearchTree<number>();
		bst.add(10).add(1).add(5).add(0).add(11).add(13);

		ok(bst.size() === 6);
		ok(bst.find(13) === 13);
		ok(bst.find(100) === undefined);
	});


	it('Should correctly remove nodes from tree', () => {
		const bst = new BinarySearchTree<number>();

		bst.add(10);
		ok(bst.remove(10) === 10);
		ok(bst.size() === 0);


		bst.add(10).add(1).add(5).add(0).add(12).add(13).add(11).add(-1).add(2).add(6);


		ok(bst.remove(100) === undefined);
		ok(bst.size() === 10);


		// both undefined
		let expectedResults = [10, 1, 12, 0, 5, 11, 13, -1, 6];
		let i = 0;
		ok(bst.remove(2) === 2);
		ok(bst.size() === expectedResults.length);
		for (const value of bst.levelOrderTraversal()) {
			ok(value === expectedResults[i]);
			i++;
		}


		// right undefined
		expectedResults = [10, 1, 12, -1, 5, 11, 13, 6];
		i = 0;
		ok(bst.remove(0) === 0);
		ok(bst.size() === expectedResults.length);
		for (const value of bst.levelOrderTraversal()) {
			ok(value === expectedResults[i]);
			i++;
		}


		// left undefined, right contains subtree
		expectedResults = [10, 5, 12, 6, 11, 13];
		i = 0;
		ok(bst.remove(-1) === -1);
		ok(bst.remove(1) === 1);
		ok(bst.size() === expectedResults.length);
		for (const value of bst.levelOrderTraversal()) {
			ok(value === expectedResults[i]);
			i++;
		}


		// both defined
		expectedResults = [11, 5, 12, 6, 13];
		i = 0;
		ok(bst.remove(10) === 10);
		ok(bst.size() === expectedResults.length);
		for (const value of bst.levelOrderTraversal()) {
			ok(value === expectedResults[i]);
			i++;
		}
		
		expectedResults = [12, 5, 13, 6];
		i = 0;
		ok(bst.remove(11) === 11);
		ok(bst.size() === expectedResults.length);
		for (const value of bst.levelOrderTraversal()) {
			ok(value === expectedResults[i]);
			i++;
		}
	});


	it('Should correctly clear tree', () => {
		const bst = new BinarySearchTree<number>();
		bst.add(10).add(1).add(5).add(0).add(11).add(13);
		ok(bst.size() === 6);

		bst.clear();
		ok(bst.size() === 0);
		ok(bst.find(10) === undefined);
	});


	it('Should correctly traverse tree in preorder', () => {
		const bst = new BinarySearchTree<number>();
		const expectedResults = [10, 1, 0, 5, 11, 13];
		let i = 0;

		bst.add(10).add(1).add(5).add(0).add(11).add(13);

		for (const nodeValue of bst.preOrderTraversal()) {
			ok(expectedResults[i] === nodeValue)
			i++;
		}
	});


	it('Should correctly traverse tree in order', () => {
		const bst = new BinarySearchTree<number>();
		const expectedResults = [0, 1, 5, 10, 11, 13];
		let i = 0;

		bst.add(10).add(1).add(5).add(0).add(11).add(13);

		for (const nodeValue of bst.inOrderTraversal()) {
			ok(expectedResults[i] === nodeValue)
			i++;
		}
	});


	it('Should correctly traverse tree in postorder', () => {
		const bst = new BinarySearchTree<number>();
		const expectedResults = [0, 1, 5, 10, 11, 13];
		let i = 0;

		bst.add(10).add(1).add(5).add(0).add(11).add(13);

		for (const nodeValue of bst.postOrderTraversal()) {
			ok(expectedResults[i] === nodeValue)
			i++;
		}
	});


	it('Should correctly traverse tree in level order', () => {
		const bst = new BinarySearchTree<number>();
		const expectedResults = [10, 1, 11, 0, 5, 13];
		let i = 0;

		bst.add(10).add(1).add(5).add(0).add(11).add(13);

		for (const nodeValue of bst.levelOrderTraversal()) {
			ok(expectedResults[i] === nodeValue)
			i++;
		}
	});


	it('Should treat object values correctly', () => {
		const bst = new BinarySearchTree<{foo: number}>((a, b) => a.foo - b.foo);
		bst.add({foo: 1});
		bst.add({foo: 5});

		ok(bst.size() === 2);
		ok(bst.find({foo: 5})?.foo === 5);
		ok(bst.find({foo: 100})?.foo === undefined);

		ok(bst.remove({foo: 5})?.foo === 5);
		ok(bst.remove({foo: 100})?.foo === undefined);
		ok(bst.size() === 1);
	});

	
	it('Should replace value at node if key is the same', () => {
		const bst = new BinarySearchTree<{foo: number, other?: string}>((a, b) => a.foo - b.foo);
		bst.add({foo: 1, other: 'bob'});
		bst.add({foo: 5, other: 'alice'});
		bst.add({foo: 1, other: 'charlie'});

		ok(bst.size() === 2);
		ok(bst.find({foo: 1})?.other === 'charlie');


		const bst2 = new BinarySearchTree<number>();
		bst2.add(10).add(1).add(5).add(0).add(11).add(13).add(10);
		ok(bst2.size() === 6);
	});


	it('Should error when given invalid parameters', () => {
		try {
			const bst = new BinarySearchTree<number>(1 as any);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

});