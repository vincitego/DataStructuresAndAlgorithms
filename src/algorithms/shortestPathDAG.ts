import { topologicalSort, AdjacencyList } from '../index.js';


export function shortestPathDAG(graph: AdjacencyList, start: number, end: number): number[] {
	const numNodes = graph.numNodes();
	const topSortResults = topologicalSort(graph);
	const visited: boolean[] = new Array(numNodes).fill(false);
	const bestDistance: number[] = new Array(numNodes).fill(Infinity);
	const startIndex = topSortResults.findIndex(node => node === start);

	bestDistance[startIndex] = 0;


	for (let i = startIndex; i < numNodes; i++) {
		if (visited[i]) continue;

		const node = topSortResults[i];
		const edges = graph.getEdges(node);
		const currentDistance = bestDistance[i];
		visited[i] = true;

		for (const [ neighbor, weight ] of edges) {
			if (currentDistance + weight < bestDistance[neighbor])
		}

	}


	const path: number[] = [];
	return path.reverse();
}


export function longestPathDAG(graph: AdjacencyList, start: number, end: number): number[] {
	const nodes = graph.getNodes();
	const inverseGraph = new AdjacencyList();
	return shortestPathDAG(graph, start, end);
}