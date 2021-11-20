import { AdjacencyList } from '../index.js';


/**
 * Algorithm to find max flow of a graph using Ford Fulkerson. First node should be source and last node should be sink.
 * @param {FlowAdjacencyList} graph Graph data represented as an adjacency list
 * @param {number} startNode Node ID of the source node
 * @param {number} endNode Node ID of the sink node
 * @returns {number[]} Flow results as flat array of node from, node to, flow amount
 */
export function maxFlow(graph: FlowAdjacencyList, startNode: number, endNode: number): number[] {
	const nodes = graph.getNodes();
	const visited = new Map(nodes.map(node => [node, 0]));
	let visitedToken = 0;
	let bottleneck = Infinity;


	while (bottleneck > 0) {
		visitedToken++;
		bottleneck = depthFirst(graph, startNode, endNode, visited, visitedToken, Infinity);
	}


	const edgeFlows: number[] = [];

	for (const nodeFrom of nodes) {
		for (const [ nodeTo, capacity, flow ] of graph.getEdgesOfNode(nodeFrom)!) {
			if (capacity === 0) continue;
			edgeFlows.push(nodeFrom, nodeTo, flow);
		}
	}

	return edgeFlows;
}


function depthFirst(graph: FlowAdjacencyList, startNode: number, endNode: number, visited: Map<number, number>, visitedToken: number, bottleneck: number): number {
	if (startNode === endNode) return bottleneck;


	const edges = graph.getEdgesOfNode(startNode);
	visited.set(startNode, visitedToken);

	for (const [ edgeTo, capacity, flow ] of edges) {
		if (visited.get(edgeTo) === visitedToken) continue;

		const remainingCapacity = capacity - flow;
		if (remainingCapacity === 0) continue; 

		let newBottleneck = Math.min(bottleneck, remainingCapacity);
		newBottleneck = depthFirst(graph, edgeTo, endNode, visited, visitedToken, newBottleneck);
		if (newBottleneck === 0) continue;

		graph._augmentFlow(startNode, edgeTo, newBottleneck);
		return newBottleneck;
	}

	return 0;
}


export class FlowAdjacencyList extends AdjacencyList {
	constructor(numNodes: number = 3) {
		super(true, numNodes);
	}


	/**
	 * Add new edge connecting 2 nodes with an optional weight. If edge already exists, weight will be updated.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @param {number} capacity Capacity for the edge. Default 1.
	 * @returns {this}
	 */
	addEdge(nodeFrom: number, nodeTo: number, capacity: number = 1): this {
		if (!this._nodes.has(nodeFrom)) throw new EvalError(`Node From does not exist. Got ${nodeFrom}`);
		if (!this._nodes.has(nodeTo)) throw new EvalError(`Node To does not exist. Got ${nodeTo}`);
		if (typeof capacity !== 'number') throw new TypeError(`Capacity needs to be a number. Got ${capacity}`);

		this._nodes.get(nodeFrom)!.set(nodeTo, [capacity, 0] as any);
		this._nodes.get(nodeTo)!.set(nodeFrom, [0, 0] as any);

		return this;
	}


	/**
	 * Delete edge connecting 2 nodes.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @returns {[number, number]} Capacity and flow of deleted edge
	 */
	deleteEdge(nodeFrom: number, nodeTo: number): number {
		if (!this._nodes.has(nodeFrom)) throw new EvalError(`Node From does not exist. Got ${nodeFrom}`);
		const nodeToDeleteFrom = this._nodes.get(nodeFrom)!;
		if (!nodeToDeleteFrom.has(nodeTo)) throw new EvalError(`Node To does not exist. Got ${nodeTo}`);

		const edgeToDelete = nodeToDeleteFrom.get(nodeTo)!;
		this._nodes.get(nodeFrom)!.delete(nodeTo);
		this._nodes.get(nodeTo)!.delete(nodeFrom);
		return (edgeToDelete as any)[0];
	}


	/**
	 * Get edges for a given node id.
	 * @param {number} node 
	 * @returns {[number, number, number][]} Array of nodes connected to given node id and the edge weight
	 */
	getEdgesOfNode(node: number): any | undefined {
		if (!this._nodes.has(node)) return undefined;
		const edges: [number, number, number][] = [];

		for (const [ edgeTo, [ capacity, flow ] ] of this._nodes.get(node)!.entries() as any) {
			edges.push([edgeTo, capacity, flow]);
		}

		return edges;
	}


	/**
	 * Helper function to augment flows of the edges
	 * @param {number} nodeFrom 
	 * @param {number} nodeTo 
	 * @param {number} flow 
	 */
	_augmentFlow(nodeFrom: number, nodeTo: number, flow: number) {
		let node1 = this._nodes.get(nodeFrom)!.get(nodeTo)! as unknown as [number, number];
		let node2 = this._nodes.get(nodeTo)!.get(nodeFrom)! as unknown as [number, number];
		node1[1] += flow;
		node2[1] -= flow;
	}
}