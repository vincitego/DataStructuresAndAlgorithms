/**
 * Graph represented as an adjacency list.
 */
export class AdjacencyList {
	private _nodes: Map<number, number>[];
	private _directed: boolean;


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
		this._nodes = [];

		for (let i = 0; i < numNodes; i++) {
			this._nodes.push(new Map<number, number>());
		}
	}


	/**
	 * Add new edge connecting 2 nodes with an optional weight. If edge already exists, weight will be updated.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @param {number} weight Weight for the edge. Default 1.
	 * @returns {this}
	 */
	addEdge(nodeFrom: number, nodeTo: number, weight: number = 1): this {
		if (typeof nodeFrom !== 'number') throw new TypeError(`Node From should be a number. Got ${nodeFrom}`);
		if (nodeFrom < 0 || nodeFrom >= this.numNodes()) throw new RangeError(`Node From out of range. Got ${nodeFrom}`)
		if (typeof nodeTo !== 'number') throw new TypeError(`Node To should be a number. Got ${nodeTo}`);
		if (nodeTo < 0 || nodeTo >= this.numNodes()) throw new RangeError(`Node To out of range. Got ${nodeTo}`);
		if (typeof weight !== 'number') throw new TypeError(`Weight needs to be a number. Got ${weight}`);

		this._nodes[nodeFrom].set(nodeTo, weight);
		if (!this._directed) this._nodes[nodeTo].set(nodeFrom, weight);
		return this;
	}


	/**
	 * Delete edge connecting 2 nodes.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @returns {this}
	 */
	deleteEdge(nodeFrom: number, nodeTo: number): number {
		if (typeof nodeFrom !== 'number') throw new TypeError(`Node From should be a number. Got ${nodeFrom}`);
		if (nodeFrom < 0 || nodeFrom >= this.numNodes()) throw new RangeError(`Node From out of range. Got ${nodeFrom}`)
		if (typeof nodeTo !== 'number') throw new TypeError(`Node To should be a number. Got ${nodeTo}`);
		if (nodeTo < 0 || nodeTo >= this.numNodes()) throw new RangeError(`Node To out of range. Got ${nodeTo}`);

		const nodeToDeleteFrom = this._nodes[nodeFrom];
		if (!nodeToDeleteFrom.has(nodeTo)) throw new EvalError(`Edge does not exist from ${nodeFrom} to ${nodeTo}`);

		const weightOfEdgeToDelete = nodeToDeleteFrom.get(nodeTo)!;
		this._nodes[nodeFrom].delete(nodeTo);
		if (!this._directed) this._nodes[nodeTo].delete(nodeFrom);
		return weightOfEdgeToDelete;
	}


	/**
	 * Get number of nodes in graph.
	 * @returns {number}
	 */
	numNodes(): number {
		return this._nodes.length;
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
	 * @returns {Map<number, number>[]}
	 */
	getGraph(): Map<number, number>[] {
		return this._nodes;
	}


	/**
	 * Get all node ids in graph.
	 * @returns {number[]}
	 */
	getNodes(): number[] {
		return [...this._nodes.keys()];
	}


	/**
	 * Get edges for a given node id.
	 * @param {number} node 
	 * @returns {[number, number][]} Array of nodes connected to given node id and the edge weight
	 */
	getEdges(node: number): [number, number][] {
		if (typeof node !== 'number') throw new TypeError(`Node should be a number. Got ${node}`);
		if (node < 0 || node >= this.numNodes()) throw new RangeError(`Node out of range. Got ${node}`)
		return [...this._nodes[node].entries()];
	}
}