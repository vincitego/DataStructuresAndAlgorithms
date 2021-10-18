import { ok } from 'assert';
import { AdjacencyList } from '../index.js';

describe('Test Adjacency List', () => {

	it('New adjacency list should be initialized correctly', () => {
		const graph = new AdjacencyList();
		ok(graph.numNodes() === 0);
		ok(graph.numEdges() === 0);

		const graph2 = new AdjacencyList(false, 3);
		ok(graph2.numNodes() === 3);
		ok(graph2.numEdges() === 0);
	});


	it('Should add new nodes correctly', () => {
		const graph = new AdjacencyList();
		ok(graph.addNode() === 0);
		ok(graph.addNode() === 1);
		ok(graph.numNodes() === 2);
	});


	it('Should add new edges to directed graph correctly', () => {
		const graph = new AdjacencyList(true, 3);
		graph.addEdge(0, 2);
		ok(graph.numEdges() === 1);
	});


	it('Should add new edges to undirected graph correctly', () => {
		const graph = new AdjacencyList(false, 3);
		graph.addEdge(0, 2);
		ok(graph.numEdges() === 1);
	});


	it('Should delete nodes correctly', () => {
		const graph = new AdjacencyList(true, 3);
		graph.addEdge(0, 2);
		graph.addEdge(0, 1);
		graph.addEdge(1, 2);
		ok(graph.numEdges() === 3);

		graph.deleteNode(1);
		ok(graph.numEdges() === 1);
	});


	it('Should delete edges from directed graph correctly', () => {
		const graph = new AdjacencyList(true, 3);
		graph.addEdge(0, 2);
		ok(graph.numEdges() === 1);

		graph.deleteEdge(0, 2);
		ok(graph.numEdges() === 0);
	});


	it('Should delete edges from undirected graph correctly', () => {
		const graph = new AdjacencyList(false, 3);
		graph.addEdge(0, 2);
		ok(graph.numEdges() === 1);

		graph.deleteEdge(2, 0);
		ok(graph.numEdges() === 0);
	});

	
	it('Get edges of a given node should return all nodes it is connected to with their weights', () => {
		const graph = new AdjacencyList(true, 3);
		graph.addEdge(0, 2);
		graph.addEdge(0, 1, 3);

		const edges = graph.getEdges(0)!;
		const expectedResults = [[2, 1], [1, 3]];

		ok(edges.length === expectedResults.length);
		for (let i = 0; i < expectedResults.length; i++) {
			ok(edges[i][0] === expectedResults[i][0]);
			ok(edges[i][1] === expectedResults[i][1]);
		}
	});

	
	it('Geting edges of a nonexistent node should return undefined', () => {
		const graph = new AdjacencyList();
		ok(graph.getEdges(0) === undefined);
	});

	
	it('Creating graph with invalid parameters should error', () => {
		try {
			const graph = new AdjacencyList(1 as any);
			ok(false);
		} catch (err) {
			ok(true);
		}
		
		try {
			const graph = new AdjacencyList(false, 'a' as any);
			ok(false);
		} catch (err) {
			ok(true);
		}
		
		try {
			const graph = new AdjacencyList(false, -1);
			ok(false);
		} catch (err) {
			ok(true);
		}
	});

	
	it('Deleting nonexistent node should return undefined', () => {
		const graph = new AdjacencyList();

		try {
			graph.deleteNode(0);
			ok(false);
		} catch (err) {
			ok(true);
		}
	});

	
	it('Adding edge with nonexistent nodes should error', () => {
		const graph = new AdjacencyList();

		try {
			graph.addEdge(0, 1);
			ok(false);
		} catch (err) {
			ok(true);
		}
	});

	
	it('Deleting edge with nonexistent nodes should error', () => {
		const graph = new AdjacencyList();

		try {
			graph.deleteEdge(0, 1);
			ok(false);
		} catch (err) {
			ok(true);
		}
	});


});