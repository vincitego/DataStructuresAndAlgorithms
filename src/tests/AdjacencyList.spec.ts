import { ok } from 'assert';
import { AdjacencyList } from '../index.js';

describe('Test Adjacency List', () => {

	it('New adjacency list should be initialized correctly', () => {
		const graph = new AdjacencyList();
		ok(graph.numNodes() === 0);
		ok(graph.numEdges() === 0);
	});

});