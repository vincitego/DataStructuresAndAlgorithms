import { AdjacencyList } from '../index.js';


/**
 * Find topological sort of a directed acyclic graph.
 * @param {AdjacencyList} graph Directed acyclic graph
 * @returns {number[]} Array of node ids in topological order
 */
export function topologicalSort(graph: AdjacencyList): number[] {
	const nodes = graph.getNodes();
	const visited = new Map<number, boolean>(nodes.map(node => [node, false]));
	const topSortResults: number[] = [];

	for (const node of nodes) {
		if (visited.get(node)) continue;
		depthFirst(graph, node, visited, topSortResults);
	}

	return topSortResults.reverse();
}


/**
 * Recursive depth first search of graph to mark connected components
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} node Index of node to start search at
 * @param {boolean[]} visited 
 * @param {number[]} topSortResults 
 */
function depthFirst(graph: AdjacencyList, node: number, visited: Map<number, boolean>, topSortResults: number[]) {
	visited.set(node, true);

	for (const [ connectedNode ] of graph.getEdgesOfNode(node)!) {
		if (visited.get(connectedNode)) continue;
		depthFirst(graph, connectedNode, visited, topSortResults);
	}

	topSortResults.push(node);
}