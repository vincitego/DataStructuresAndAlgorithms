import { ok } from 'assert';
import { AdjacencyList, findArticulationPoints } from '../index.js';

describe('Test Algorithm to Find Articulation Points', () => {

	it('Should output all articulation points of graph', () => {
		const graph = new AdjacencyList(false, 9);
		graph.addEdge(0, 1).addEdge(1, 2).addEdge(0, 2).addEdge(2, 3).addEdge(3, 4).addEdge(2, 5).addEdge(5, 6).addEdge(6, 7).addEdge(7, 8).addEdge(5, 8);

		const articulationPoints = findArticulationPoints(graph);
		console.log(articulationPoints);
		const expectedResults = [3, 2, 5];
		ok(expectedResults.length === articulationPoints.length);

		for (let i = expectedResults.length - 1; i >= 0; i--) {
			ok(articulationPoints[i] === expectedResults[i]);
		}
	});

});