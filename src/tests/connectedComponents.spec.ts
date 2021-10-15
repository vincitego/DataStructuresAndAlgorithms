import { ok } from 'assert';
import { connectedComponents } from "../index.js";


describe('Test Connected Components Algorithm', () => {

	it('Should output the same color for connected components', () => {
		const graph = [
			[4, 8, 13, 14],
			[5],
			[9, 15],
			[9],
			[0, 8],
			[1, 16, 17],
			[7, 11],
			[6, 11],
			[0, 4, 14],
			[2, 3, 15],
			[15],
			[6, 7],
			[],
			[0, 14],
			[0, 8, 13],
			[2, 9, 10],
			[5],
			[5],
		];

		const components = connectedComponents(graph);
		const expectedResults = [1, 2, 3, 3, 1, 2, 4, 4, 1, 3, 3, 4, 5, 1, 1, 3, 2, 2];
		ok(expectedResults.length === components.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(components[i] === expectedResults[i]);
		}
	});

	
	it('Invalid graphs should error', () => {
		try {
			const graph = [
				[4, 8, 13, 14],
				[5],
			];

			connectedComponents(graph);
			ok(false);
		} catch (err) {
			ok(true);
		}
		

		try {
			const graph = [
				['a'],
				[0],
			];

			connectedComponents(graph as any);
			ok(false);
		} catch (err) {
			ok(true);
		}


		try {
			const graph = [
				[1.1],
				[0],
			];

			connectedComponents(graph);
			ok(false);
		} catch (err) {
			ok(true);
		}
	});

});