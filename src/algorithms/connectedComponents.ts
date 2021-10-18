import { AdjacencyList } from '../index.js';


/**
 * Find and label connected components of the given graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {number[]} Array representing component that nodes belong to
 */
export function connectedComponents(graph: AdjacencyList): number[] {
	const nodeCount = graph.numNodes();
	const components: number[] = new Array(nodeCount).fill(0);
	let color = 0;

	for (let node = 0; node < nodeCount; node++) {
		if (components[node] > 0) continue;
		color++;
		depthFirst(graph, node, color, components);
	}

	return components;
}


/**
 * Recursive depth first search of graph to mark connected components
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} node Index of node to start search at
 * @param {number} color Number representing component to label nodes
 * @param {number} components Array representing component that nodes belong to
 */
function depthFirst(graph: AdjacencyList, node: number, color: number, components: number[]): void {
	components[node] = color;
	
	for (const [ connectedNode ] of graph.getEdges(node)!) {
		if (components[connectedNode] > 0) continue;
		depthFirst(graph, connectedNode, color, components);
	}
}