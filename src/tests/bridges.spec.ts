import { ok } from 'assert';
import { AdjacencyList, findBridges } from '../index.js';

describe('Test Algorithm to Find Bridges', () => {

	it('Should output all bridges of graph', () => {
		const graph = new AdjacencyList(false, 9);
		graph.addEdge(0, 1).addEdge(1, 2).addEdge(0, 2).addEdge(2, 3).addEdge(3, 4).addEdge(2, 5).addEdge(5, 6).addEdge(6, 7).addEdge(7, 8).addEdge(5, 8);

		const bridges = findBridges(graph);
		const expectedResults = [3, 4, 2, 3, 2, 5];
		ok(expectedResults.length === bridges.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(bridges[i] === expectedResults[i]);
		}
	});

});