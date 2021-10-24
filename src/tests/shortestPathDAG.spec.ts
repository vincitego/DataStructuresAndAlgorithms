import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { shortestPathDAG, longestPathDAG } from "../index.js";


describe('Test Shortest Path Algorithm for Directed Acyclic Graphs', () => {

	it('Should output shortest', () => {
		const graph = new AdjacencyList(true, 8);
		graph.addEdge(0, 1, 3).addEdge(0, 2, 6);
		graph.addEdge(1, 2, 4).addEdge(1, 3, 4).addEdge(1, 4, 11);
		graph.addEdge(2, 3, 8).addEdge(2, 6, 11);
		graph.addEdge(3, 4, -4).addEdge(3, 5, 5).addEdge(3, 6, 2);
		graph.addEdge(4, 7, 9);
		graph.addEdge(5, 7, 1);
		graph.addEdge(6, 7, 2);

		const results = shortestPathDAG(graph, 0, 7);
		const expectedResults = [0, 1, 3, 6, 7];
		ok(results.length === expectedResults.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(expectedResults[i] === results[i]);
		}
	});


	it('Should output longest path', () => {
		const graph = new AdjacencyList(true, 8);
		graph.addEdge(0, 1, 3).addEdge(0, 2, 6);
		graph.addEdge(1, 2, 4).addEdge(1, 3, 4).addEdge(1, 4, 11);
		graph.addEdge(2, 3, 8).addEdge(2, 6, 11);
		graph.addEdge(3, 4, -4).addEdge(3, 5, 5).addEdge(3, 6, 2);
		graph.addEdge(4, 7, 9);
		graph.addEdge(5, 7, 1);
		graph.addEdge(6, 7, 2);
		
		const results = longestPathDAG(graph, 0, 7);
		const expectedResults = [0, 1, 4, 7];
		ok(results.length === expectedResults.length);
		
		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(expectedResults[i] === results[i]);
		}
	});

});