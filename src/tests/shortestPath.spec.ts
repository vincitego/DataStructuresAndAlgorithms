import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { shortestPath } from "../index.js";


describe('Test Shortest Path Algorithm', () => {

	it('Should output shortest path', () => {
		const graph = new AdjacencyList(false, 13);
		graph.addEdge(0, 9).addEdge(0, 7).addEdge(0, 11);
		graph.addEdge(1, 8).addEdge(1, 10);
		graph.addEdge(2, 3).addEdge(2, 12);
		graph.addEdge(3, 4).addEdge(3, 7);
		graph.addEdge(5, 6);
		graph.addEdge(6, 7);
		graph.addEdge(7, 11);
		graph.addEdge(8, 9).addEdge(8, 12);
		graph.addEdge(9, 10);

		const path = shortestPath(graph, 0, 4)!;
		const expectedResults = [0, 7, 3, 4];
		ok(expectedResults.length === path.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(path[i] === expectedResults[i]);
		}


		const path2 = shortestPath(graph, 10, 10);
		ok(path2?.length === 1);
		ok(path2[0] === 10);
	});


	it('Should output undefined for unconnected nodes', () => {
		const graph = new AdjacencyList(false, 13);
		graph.addEdge(0, 9).addEdge(0, 7).addEdge(0, 11);
		graph.addEdge(1, 8).addEdge(1, 10);
		graph.addEdge(2, 3).addEdge(2, 12);
		graph.addEdge(3, 7);
		graph.addEdge(5, 6);
		graph.addEdge(6, 7);
		graph.addEdge(7, 11);
		graph.addEdge(8, 9).addEdge(8, 12);
		graph.addEdge(9, 10);

		const path = shortestPath(graph, 0, 4);
		ok(path === undefined);
	});

});