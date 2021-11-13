import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { stronglyConnectedComponents } from "../index.js";

describe('Test Strongly Connected Components Algorithm', () => {
	it('Should output the same color for all strongly connected components', () => {
		const graph = new AdjacencyList(true, 8);
		graph.addEdge(0, 1);
		graph.addEdge(1, 2);
		graph.addEdge(2, 0);
		graph.addEdge(3, 4).addEdge(3, 7);
		graph.addEdge(4, 5);
		graph.addEdge(5, 0).addEdge(5, 6);
		graph.addEdge(6, 0).addEdge(6, 2).addEdge(6, 4);
		graph.addEdge(7, 3).addEdge(7, 5);

		const components = [...stronglyConnectedComponents(graph).values()];
		const expectedResults = [1, 1, 1, 4, 5, 5, 5, 4];
		ok(expectedResults.length === components.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(components[i] === expectedResults[i]);
		}
	});

});