import { AdjacencyList } from '../index.js';
import { IndexedPriorityQueue } from '../index.js';


/**
 * Finds shortest path between a given start node and end node.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} start Node index to start path on
 * @param {number} end Node index to end path on
 * @returns {number[]} Path of nodes to traverse if a path exists
 */
export function djikstra(graph: AdjacencyList, start: number, end: number): number[] {
	const nodes = graph.getNodes();
	const visited = new Map<number, boolean>(nodes.map(node => [node, false]));
	const bestDistance = new Map<number, number>(nodes.map(node => [node, Infinity]));
	const previous = new Map<number, number>(nodes.map(node => [node, -1]));
	const queue = new IndexedPriorityQueue<number, number>();

	bestDistance.set(start, 0);
	queue.add(start, 0);


	while (queue.size() > 0) {
		const [ node, currentDistance ] = queue.poll()!;
		visited.set(node, true);

		for (const [ neighbor, weight ] of graph.getEdgesOfNode(node)!) {
			const newPathWeight = currentDistance + weight;

			if (newPathWeight < bestDistance.get(neighbor)!) {
				bestDistance.set(neighbor, newPathWeight);
				previous.set(neighbor, node);
				queue.add(neighbor, newPathWeight);
			}
		}

		if (node === end) break;
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