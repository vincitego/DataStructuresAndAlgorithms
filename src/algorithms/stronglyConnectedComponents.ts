import { AdjacencyList } from '../index.js';


/**
 * Find and label strongly connected components of the given graph using Tarjan's algorithm.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {Map<number, number>} Map of node ids and their component group id
 */
export function stronglyConnectedComponents(graph: AdjacencyList): Map<number, number> {
	const nodes = graph.getNodes();
	const ids = new Map<number, number>(nodes.map(node => [node, 0]));
	const lowLinks = new Map<number, number>(nodes.map(node => [node, 0]));
	const onStack = new Map<number, boolean>(nodes.map(node => [node, false]));
	const stack: number[] = [];
	let id = 0;

	for (const node of nodes) {
		if (ids.get(node)! > 0) continue;
		id = depthFirst(graph, node, id, ids, lowLinks, onStack, stack);
	}

	return lowLinks;
}


function depthFirst(graph: AdjacencyList, node: number, id: number, ids: Map<number, number>, lowLinks: Map<number, number>, onStack: Map<number, boolean>, stack: number[]): number {
	let currentId = id + 1;
	ids.set(node, currentId);
	lowLinks.set(node, currentId);
	stack.push(node);
	onStack.set(node, true);


	for (const [connectedNode] of graph.getEdgesOfNode(node)!) {
		if (ids.get(connectedNode)! === 0) {
			currentId = depthFirst(graph, connectedNode, currentId, ids, lowLinks, onStack, stack);
		}

		if (onStack.get(connectedNode)) {
			lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(connectedNode)!));
		}
	}


	const nodeId = ids.get(node)!;

	if (nodeId === lowLinks.get(node)) {
		for (let stackNode = stack.pop()!; ; stackNode = stack.pop()!) {
			onStack.set(stackNode!, false);
			lowLinks.set(stackNode, nodeId);
			if (stackNode === node) break;
		}
	}

	return currentId;
}