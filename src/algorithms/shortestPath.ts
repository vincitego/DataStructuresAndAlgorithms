import { AdjacencyList } from '../index.js';
import { LinkedList } from '../index.js';

/**
 * Finds shortest path between a given start node and end node.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} start Node index to start path on
 * @param {number} end Node index to end path on
 * @returns {number[] | undefined} Path of nodes to traverse if a path exists
 */
export function shortestPath(graph: AdjacencyList, start: number, end: number): number[] | undefined {
	const graphMap = graph.getGraph();
	const nodes = graph.getNodes();

	if (typeof start !== 'number') throw new TypeError(`Start node id ${start} needs to be numeric.`);
	if (!graphMap.has(start)) throw new TypeError(`Start node id ${start} not found in graph.`);
	
	if (typeof end !== 'number') throw new TypeError(`End node id ${end} needs to be numeric.`);
	if (!graphMap.has(end)) throw new TypeError(`End node id ${end} not found in graph.`);

	const previousNode = new Map<number, number>(nodes.map(node => [node, -1]));
	const queue = new LinkedList<number>();

	previousNode.set(start, start);
	queue.addBack(start);


	while (queue.size() > 0) {
		const currentNode = queue.removeFront()!;

		for (const [ connectedNode ] of graph.getEdgesOfNode(currentNode)!) {
			if (previousNode.get(connectedNode)! >= 0) continue;
			previousNode.set(connectedNode, currentNode);

			if (currentNode === end) {
				queue.clear();
				break;
			}

			queue.addBack(connectedNode);
		}
	}


	if (previousNode.get(end)! < 0) return;

	const path: number[] = [];
	let pathNode = end;
	path.push(pathNode);

	while (pathNode !== start) {
		pathNode = previousNode.get(pathNode)!;
		path.push(pathNode);
	}

	return path.reverse();
}