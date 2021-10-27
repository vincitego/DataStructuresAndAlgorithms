import { AdjacencyList } from '../index.js';


/**
 * Finds negative cycles using Bellman Ford algorithm.
 * @param graph Graph data represented as an adjacency list
 * @returns {number[]} Nodes directly and indirectly involved in a negative cycle
 */
export function negativeCycles(graph: AdjacencyList, start: number): number[] {
	const cycles = new Set<number>();
	const nodes = graph.getNodes();
	const numNodes = nodes.length;
	const edges = graph.getEdges();
	const bestDistance = new Map<number, number>(nodes.map(node => [node, Infinity]));
	bestDistance.set(start, 0);

	for (let i = 0; i < numNodes - 1; i++) {
		for (const [ from, to, weight ] of edges) {
			const fromDistance = bestDistance.get(from)!;
			const toDistance = bestDistance.get(to)!;
			const newDistance = fromDistance + weight;

			if (newDistance < toDistance) {
				bestDistance.set(to, newDistance);
			}
		}
	}
	
	for (const [ from, to, weight ] of edges) {
		const fromDistance = bestDistance.get(from)!;
		const toDistance = bestDistance.get(to)!;
		const newDistance = fromDistance + weight;

		if (newDistance < toDistance) {
			bestDistance.set(to, newDistance);
			cycles.add(to);
		}
	}

	return [...cycles.values()];
}