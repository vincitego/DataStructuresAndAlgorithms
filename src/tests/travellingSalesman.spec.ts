import { ok } from 'assert';
import { AdjacencyList, travellingSalesman } from '../index.js';

describe('Test Algorithm for Traveling Salesman', () => {

	it('Should return smallest weight circuit of graph', () => {
		const graph = new AdjacencyList(true, 4);
		graph.addEdge(0, 1, 4).addEdge(0, 2, 1).addEdge(0, 3, 9);
		graph.addEdge(1, 0, 3).addEdge(1, 2, 6).addEdge(1, 3, 11);
		graph.addEdge(2, 0, 4).addEdge(2, 1, 1).addEdge(2, 3, 2);
		graph.addEdge(3, 0, 6).addEdge(3, 1, 5).addEdge(3, 2, -4);

		const path = travellingSalesman(graph, 0);
		const expectedResults = [0, 3, 2, 1, 0];
		ok(expectedResults.length === path.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(path[i] === expectedResults[i]);
		}
	});

});