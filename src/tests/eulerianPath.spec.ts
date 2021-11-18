import { ok } from 'assert';
import { AdjacencyList, eulerianPath } from '../index.js';

describe('Test Algorithm for finding Eulerian Paths / Circuits', () => {

	it('Should return eulerian path of graph', () => {
		const graph = new AdjacencyList(true, 7);
		graph.addEdge(1, 2).addEdge(1, 3);
		graph.addEdge(2, 2).addEdge(2, 4);
		graph.addEdge(3, 1).addEdge(3, 2).addEdge(3, 5);
		graph.addEdge(4, 3);
		graph.addEdge(5, 6);
		graph.addEdge(6, 3);

		const path = eulerianPath(graph);
		const expectedResults = [1, 3, 5, 6, 3, 2, 4, 3, 1, 2, 2];
		ok(expectedResults.length === path.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(path[i] === expectedResults[i]);
		}
	});

});