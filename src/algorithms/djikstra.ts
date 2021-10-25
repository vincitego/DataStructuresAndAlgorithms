import { AdjacencyList } from '../index.js';
import { IndexedPriorityQueue } from '../index.js';


export function djikstra(graph: AdjacencyList, start: number, end: number): number[] {
	const nodes = graph.getNodes();
	const visited = new Map<number, boolean>(nodes.map(node => [node, false]));
	const previous = new Map<number, number>(nodes.map(node => [node, -1]));
	const queue = new IndexedPriorityQueue<number, number>();
	queue.add(start, 0);


	while (queue.size() > 0) {
		const [ node, value ] = queue.poll()!;
		visited.set(node, true);
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