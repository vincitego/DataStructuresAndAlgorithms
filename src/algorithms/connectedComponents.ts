import { AdjacencyList } from '../index.js';


/**
 * Find and label connected components of the given graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {Map<number, number>} Array representing component that nodes belong to
 */
export function connectedComponents(graph: AdjacencyList): Map<number, number> {
	const nodes = graph.getNodes();
	const components = new Map<number, number>(nodes.map(node => [node, 0]));
	let color = 0;

	for (const node of nodes) {
		if (components.get(node)! > 0) continue;
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
 * @param {number[]} components Array representing component that nodes belong to
 */
function depthFirst(graph: AdjacencyList, node: number, color: number, components: Map<number, number>): void {
	components.set(node, color);
	
	for (const [ connectedNode ] of graph.getEdges(node)!) {
		if (components.get(connectedNode)! > 0) continue;
		depthFirst(graph, connectedNode, color, components);
	}
}