import { topologicalSort, AdjacencyList } from '../index.js';


/**
 * Finds shortest path between a given start node and end node on a directed acyclic graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} start Node index to start path on
 * @param {number} end Node index to end path on
 * @returns {number[]} Path of nodes to traverse if a path exists
 */
export function shortestPathDAG(graph: AdjacencyList, start: number, end: number): number[] {
	const topSortResults = topologicalSort(graph);
	const numNodes = topSortResults.length;
	const bestDistance = new Map<number, number>(topSortResults.map(node => [node, Infinity]));
	const previous = new Map<number, number>(topSortResults.map(node => [node, -1]));
	const startIndex = topSortResults.findIndex(node => node === start);

	bestDistance.set(startIndex, 0);
	previous.set(startIndex, startIndex);

	for (let i = startIndex; i < numNodes; i++) {
		const node = topSortResults[i];
		const currentDistance = bestDistance.get(node)!;

		for (const [ neighbor, weight ] of graph.getEdges(node)!) {
			const newPathWeight = currentDistance + weight;

			if (newPathWeight < bestDistance.get(neighbor)!) {
				bestDistance.set(neighbor, newPathWeight);
				previous.set(neighbor, node);
			}
		}
	}


	const path: number[] = [];
	let previousNode = previous.get(end)!;
	if (previousNode < 0) return path;

	path.push(end);

	while (previousNode !== start) {
		path.push(previousNode);
		previousNode = previous.get(previousNode)!;
	}

	path.push(start);
	
	return path.reverse();
}


/**
 * Finds longest path between a given start node and end node on a directed acyclic graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} start Node index to start path on
 * @param {number} end Node index to end path on
 * @returns {number[]} Path of nodes to traverse if a path exists
 */
export function longestPathDAG(graph: AdjacencyList, start: number, end: number): number[] {
	const topSortResults = topologicalSort(graph);
	const numNodes = topSortResults.length;
	const bestDistance = new Map<number, number>(topSortResults.map(node => [node, Infinity]));
	const previous = new Map<number, number>(topSortResults.map(node => [node, -1]));
	const startIndex = topSortResults.findIndex(node => node === start);

	bestDistance.set(startIndex, 0);
	previous.set(startIndex, startIndex);

	for (let i = startIndex; i < numNodes; i++) {
		const node = topSortResults[i];
		const currentDistance = bestDistance.get(node)!;

		for (const [ neighbor, originalWeight ] of graph.getEdges(node)!) {
			const weight = originalWeight * -1;
			const newPathWeight = currentDistance + weight;

			if (newPathWeight < bestDistance.get(neighbor)!) {
				bestDistance.set(neighbor, newPathWeight);
				previous.set(neighbor, node);
			}
		}
	}


	const path: number[] = [];
	let previousNode = previous.get(end)!;
	if (previousNode < 0) return path;

	path.push(end);

	while (previousNode !== start) {
		path.push(previousNode);
		previousNode = previous.get(previousNode)!;
	}

	path.push(start);
	
	return path.reverse();
}