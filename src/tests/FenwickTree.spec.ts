import { FenwickTree } from "../index.js";
import { ok } from 'assert';


describe('Test Fenwick Tree', () => {

	it('Should initialize correctly', () => {
		const fenwick = new FenwickTree();
		ok(fenwick.size() === 0);


		const fenwick2 = new FenwickTree([3, 4, -2, 7, 3, 11, 5, -8, -9, 2, 4, -8]);
		const expectedResults = [3, 7, -2, 12, 3, 14, 5, 23, -9, -7, 4, -11];
		let i = 0;
		
		ok(fenwick2.size() === 12);

		for (const value of fenwick2) {
			ok(value === expectedResults[i]);
			i++;
		}

		ok(fenwick2.query(2) === 4);
		ok(fenwick2.query(5, 8) === 11);
	});
	

	it('Should add value to index correctly', () => {
		const fenwick = new FenwickTree([3, 4, -2, 7, 3, 11, 5, -8, -9, 2, 4, -8]);
		const expectedResults = [3, 7, 1, 15, 3, 14, 5, 26, -9, -7, 4, -11];
		let i = 0;

		fenwick.add(3, 3);

		for (const value of fenwick) {
			ok(value === expectedResults[i]);
			i++;
		}

		ok(fenwick.query(2) === 4);
		ok(fenwick.query(5, 8) === 11);
		ok(fenwick.query(3, 9) === 10);
	});
	

	it('Should update value at index correctly', () => {
		const fenwick = new FenwickTree([3, 4, -2, 7, 3, 11, 5, -8, -9, 2, 4, -8]);
		const expectedResults = [3, 7, 1, 15, 3, 14, 5, 26, -9, -7, 4, -11];
		let i = 0;

		fenwick.set(3, 1);

		for (const value of fenwick) {
			ok(value === expectedResults[i]);
			i++;
		}

		ok(fenwick.query(2) === 4);
		ok(fenwick.query(5, 8) === 11);
		ok(fenwick.query(3, 9) === 10);
	});
	

	it('Should correctly add new values to end of tree', () => {
		const fenwick = new FenwickTree([3, 4]);
		const expectedResults = [3, 7, -2, 12, 3, 14, 5, 23, -9, -7, 4, -11];
		let i = 0;

		fenwick.push(-2).push(7).push(3).push(11).push(5).push(-8).push(-9).push(2).push(4).push(-8);
		
		ok(fenwick.size() === 12);

		for (const value of fenwick) {
			ok(value === expectedResults[i]);
			i++;
		}

		ok(fenwick.query(2) === 4);
		ok(fenwick.query(5, 8) === 11);
	});

});