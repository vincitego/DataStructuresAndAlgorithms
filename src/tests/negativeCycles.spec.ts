import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { negativeCycles } from "../index.js";


describe('Test Negative Cycles Algorithm', () => {

	it('Should find all nodes involved in negative cycles', () => {
		const graph = new AdjacencyList(true, 10);
		graph.addEdge(0, 1, 5);
		graph.addEdge(1, 2, 20).addEdge(1, 5, 30).addEdge(1, 6, 60);
		graph.addEdge(2, 3, 10).addEdge(2, 4, 75);
		graph.addEdge(3, 2, -15);
		graph.addEdge(4, 9, 100);
		graph.addEdge(5, 4, 25).addEdge(5, 6, 5).addEdge(5, 8, 50);
		graph.addEdge(6, 7, -50);
		graph.addEdge(7, 8, -10);

		const cycles = negativeCycles(graph, 0);
		const expectedResults = [2, 3, 4, 9];
		ok(expectedResults.length === cycles.length);

		for (const node of cycles) {
			ok(expectedResults.includes(node));
		}
	});

});