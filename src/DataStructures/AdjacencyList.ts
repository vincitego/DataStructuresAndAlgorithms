/**
 * Graph represented as an adjacency list.
 */
export class AdjacencyList {
	private _nodes: Map<number, Map<number, number>>;
	private _directed: boolean;
	private _nextId: number;


	/**
	 * Creates a new adjacency list.
	 * @param {boolean} directed Defines whether edges are directed. Default false.
	 * @param {number} numNodes Number of nodes to initiate graph with. Default 0.
	 */
	constructor(directed: boolean = false, numNodes: number = 0) {
		if (typeof directed !== 'boolean') throw new TypeError(`Directed needs to be a boolean, got ${directed}`);
		if (typeof numNodes !== 'number') throw new TypeError(`Number of nodes needs to be a number. Got ${numNodes}`);
		if (numNodes < 0) throw new RangeError(`Number of nodes needs to be >= 0. Got ${numNodes}`);


		this._directed = directed;
		this._nodes = new Map<number, Map<number, number>>();
		this._nextId = numNodes;

		for (let i = 0; i < numNodes; i++) {
			this._nodes.set(i, new Map<number, number>());
		}
	}


	/**
	 * Add new node to the adjacency list.
	 * @returns {this}
	 */
	addNode(): this {
		this._nodes.set(this._nextId, new Map<number, number>());
		this._nextId++;
		return this;
	}


	/**
	 * Delete node at given index
	 * @param {number} node Index of node to delete
	 * @returns {Map<number, number> | undefined} Map of connected node => weight
	 */
	deleteNode(node: number): Map<number, number> | undefined {
		const nodeToDelete = this._nodes.get(node);
		this._nodes.delete(node);
		return nodeToDelete;
	}


	addEdge(nodeFrom: number, nodeTo: number, weight: number = 1): this {
		if (!this._nodes.has(nodeFrom)) throw new EvalError(`Node From does not exist. Got ${nodeFrom}`);
		if (!this._nodes.has(nodeTo)) throw new EvalError(`Node To does not exist. Got ${nodeTo}`);

		this._nodes.get(nodeFrom)!.set(nodeTo, weight);
		if (!this._directed) this._nodes.get(nodeTo)!.set(nodeFrom, weight);
		return this;
	}


	deleteEdge(nodeFrom: number, nodeTo: number): number {
		if (!this._nodes.has(nodeFrom)) throw new EvalError(`Node From does not exist. Got ${nodeFrom}`);
		const nodeToDeleteFrom = this._nodes.get(nodeFrom)!;
		if (!nodeToDeleteFrom.has(nodeTo)) throw new EvalError(`Node To does not exist. Got ${nodeTo}`);

		const edgeToDelete = nodeToDeleteFrom.get(nodeTo)!;
		this._nodes.get(nodeFrom)!.delete(nodeTo);
		if (!this._directed) this._nodes.get(nodeTo)!.delete(nodeFrom);
		return edgeToDelete;
	}


	/**
	 * Get number of nodes in graph.
	 * @returns {number}
	 */
	numNodes(): number {
		return this._nodes.size;
	}


	/**
	 * Get number of edges in graph.
	 * @returns {number}
	 */
	numEdges(): number {
		const nodesArray = [...this._nodes.values()];
		const edgeCount = nodesArray.reduce((sum, node) => sum + node.size, 0);
		return this._directed ? edgeCount : edgeCount / 2;
	}


	/**
	 * Get graph data.
	 * @returns {Map<number, Map<number, number>>}
	 */
	getGraph(): Map<number, Map<number, number>> {
		return this._nodes;
	}


	/**
	 * Get edges for a given node index.
	 * @param {number} node 
	 * @returns {[number, number][]}
	 */
	getEdges(node: number): [number, number][] | undefined {
		if (!this._nodes.has(node)) return undefined;
		return [...this._nodes.get(node)!.entries()];
	}
}