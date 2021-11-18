import { AdjacencyList } from '../index.js';


/**
 * Algorithm to find eulerian path or circuit of a graph.
 * @param {AdjacencyList} graph Graph data represented as an adjacency list
 * @returns {number[]} Eulerian path/circuit represented as an array of node ids, if path exists
 */
export function eulerianPath(graph: AdjacencyList): number[] {
	const path: number[] = [];
	const nodes = graph.getNodes();
	const numEdges = graph.numEdges();
	const inCounts = new Map<number, number>(nodes.map(node => [node, 0]));
	const outCounts = new Map<number, number>(nodes.map(node => [node, 0]));
	let startNodeCount = 0;
	let endNodeCount = 0;
	let startNode = -1;
	let anyNodeWithOutgoing = 0;

	
	for (const [outNode, inNode] of graph.getEdges()) {
		outCounts.set(outNode, outCounts.get(outNode)! + 1);
		inCounts.set(inNode, inCounts.get(inNode)! + 1);
	}

	for (const node of nodes) {
		const inCount = inCounts.get(node)!;
		const outCount = outCounts.get(node)!;

		if (Math.abs(outCount - inCount) > 1) {
			return [];
		} else if (outCount - inCount === 1) {
			startNodeCount++;
			startNode = node;
		} else if (inCount - outCount === 1) {
			endNodeCount++;
		}

		if (outCount > 0) anyNodeWithOutgoing = node;
	}


	if (!((startNodeCount === 0 && endNodeCount === 0) || (startNodeCount === 1 && endNodeCount === 1))) {
		// no eulerian path
		return [];
	} else if (startNode < 0) {
		startNode = anyNodeWithOutgoing;
	}


	depthFirst(graph, path, outCounts, startNode);


	if (path.length === numEdges + 1) {
		return path.reverse();
	} else {
		// no eulerian path because more than one component exists
		return [];
	}
}


function depthFirst(graph: AdjacencyList, path: number[], outCounts: Map<number, number>, node: number) {
	const edges = graph.getEdgesOfNode(node)!;

	while (outCounts.get(node) !== 0) {
		const nextEdgeIndex = outCounts.get(node)! - 1;
		outCounts.set(node, nextEdgeIndex);
		depthFirst(graph, path, outCounts, edges[nextEdgeIndex][0]);
	}

	path.push(node);
}