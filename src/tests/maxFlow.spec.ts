import { ok } from 'assert';
import { FlowAdjacencyList, maxFlow } from '../index.js';

describe('Test Algorithm for Max Flow', () => {

	it('Should return max flow of graph', () => {
		const graph = new FlowAdjacencyList(11);

		graph.addEdge(0, 1, 10).addEdge(0, 2, 5).addEdge(0, 3, 10);

		graph.addEdge(1, 4, 10);
		graph.addEdge(2, 3, 10);
		graph.addEdge(3, 6, 15);
		graph.addEdge(4, 2, 20).addEdge(4, 7, 15);
		graph.addEdge(5, 2, 15).addEdge(5, 4, 3);
		graph.addEdge(6, 5, 4).addEdge(6, 9, 10);
		graph.addEdge(7, 8, 10);
		graph.addEdge(8, 5, 10);
		graph.addEdge(8, 6, 7);

		graph.addEdge(7, 10, 15).addEdge(9, 10, 10);

		const flow = maxFlow(graph, 0, 10);
		const expectedResults = [0, 1, 10, 0, 2, 5, 0, 3, 8, 1, 4, 10, 2, 3, 5, 3, 6, 13, 4, 2, 0, 4, 7, 13, 5, 2, 0, 5, 4, 3, 6, 5, 3, 6, 9, 10, 7, 8, 0, 7, 10, 13, 8, 5, 0, 8, 6, 0, 9, 10, 10];
		ok(expectedResults.length === flow.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(flow[i] === expectedResults[i]);
		}
	});

});