import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { topologicalSort } from "../index.js";


describe('Test Topological Sort Algorithm', () => {

	it('Should return graph in topological sort order', () => {
		const graph = new AdjacencyList(true, 11);
		graph.addEdge(0, 1).addEdge(0, 2).addEdge(0, 3);
		graph.addEdge(1, 9,);
		graph.addEdge(2, 5).addEdge(2, 8);
		graph.addEdge(3, 4).addEdge(3, 6);
		graph.addEdge(4, 7).addEdge(4, 10);

		const topSortResults = topologicalSort(graph);
		const expectedResults = [0, 3, 6, 4, 10, 7, 2, 8, 5, 1, 9];

		ok(topSortResults.length === expectedResults.length);
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(topSortResults[i] === expectedResults[i]);
		}
	});

});