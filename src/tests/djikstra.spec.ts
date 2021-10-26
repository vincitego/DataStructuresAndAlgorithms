import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { djikstra } from "../index.js";


describe('Test Djikstra Algorithm', () => {

	it('Should output shortest path on undirected graph', () => {
		const graph = new AdjacencyList(false, 5);
		graph.addEdge(0, 1, 4).addEdge(0, 2, 1).addEdge(1, 2, 2).addEdge(1, 3, 1).addEdge(2, 3, 5).addEdge(3, 4, 3);

		const path = djikstra(graph, 0, 4);
		const expectedResults = [0, 2, 1, 3, 4];
		ok(expectedResults.length === path.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(path[i] === expectedResults[i]);
		}
	});


	it('Should output shortest path on directed graph', () => {
		const graph = new AdjacencyList(false, 6);
		graph.addEdge(0, 1, 5).addEdge(0, 2, 1);
		graph.addEdge(1, 2, 2).addEdge(1, 3, 3).addEdge(1, 4, 20);
		graph.addEdge(2, 1, 3).addEdge(2, 4, 12);
		graph.addEdge(3, 5, 6).addEdge(3, 4, 2);
		graph.addEdge(4, 5, 1);

		const path = djikstra(graph, 0, 5);
		const expectedResults = [0, 2, 1, 3, 4, 5];
		ok(expectedResults.length === path.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(path[i] === expectedResults[i]);
		}
	});

});