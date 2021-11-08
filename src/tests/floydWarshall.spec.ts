import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { floydWarshall } from "../index.js";


describe('Test Floyd Warshall Algorithm', () => {

	it('Should output all pairs shortest path', () => {
		const graph = new AdjacencyList(true, 3);
		graph.addEdge(0, 2, 100).addEdge(0, 1, 1).addEdge(1, 2, 3);

		const results = floydWarshall(graph);
		const expectedResults = [
			[Infinity, 1, 1],
			[Infinity, Infinity, 2],
			[Infinity, Infinity, Infinity],
		];

		ok(results.length === expectedResults.length);
		for (let i = results.length - 1; i >= 0; i--) {
			for (let j = results.length - 1; j >= 0; j--) {
				ok(results[i][j] === expectedResults[i][j]);
			}
		}
	});


	it('Should output all pairs shortest path with negative cyles detected', () => {
		const graph = new AdjacencyList(true, 4);
		graph.addEdge(0, 2, 100).addEdge(0, 1, 1).addEdge(1, 2, 3);
		graph.addEdge(1, 1, -1).addEdge(0, 3, 200);

		const results = floydWarshall(graph);
		const expectedResults = [
			[Infinity, -Infinity, -Infinity, 3],
			[Infinity, -Infinity, -Infinity, Infinity],
			[Infinity, Infinity, Infinity, Infinity],
			[Infinity, Infinity, Infinity, Infinity],
		];

		ok(results.length === expectedResults.length);
		for (let i = results.length - 1; i >= 0; i--) {
			for (let j = results.length - 1; j >= 0; j--) {
				ok(results[i][j] === expectedResults[i][j]);
			}
		}
	});

});