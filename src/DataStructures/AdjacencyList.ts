/**
 * Graph represented as an adjacency list.
 */
export class AdjacencyList {
	protected _nodes: Map<number, Map<number, number>>;
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
		this._nodes = new Map<number, Map<number, number>>();

		for (let i = 0; i < numNodes; i++) {
			this._nodes.set(i, new Map<number, number>());
		}
	}


	/**
	* Add new node to the adjacency list.
	* @returns {this}
	*/
 addNode(id: number): this {
	 this._nodes.set(id, new Map<number, number>());
	 return this;
 }


 /**
	* Delete node at given id
	* @param {number} node id of node to delete
	* @returns {Map<number, number> | undefined} Map of connected node => weight
	*/
 deleteNode(node: number): Map<number, number> | undefined {
	 const nodeToDelete = this._nodes.get(node);
	 this._nodes.delete(node);

	 for (const edge of this._nodes.values()) {
		 if (edge.has(node)) edge.delete(node);
	 }

	 return nodeToDelete;
 }


	/**
	 * Add new edge connecting 2 nodes with an optional weight. If edge already exists, weight will be updated.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @param {number} weight Weight for the edge. Default 1.
	 * @returns {this}
	 */
	addEdge(nodeFrom: number, nodeTo: number, weight: number = 1): this {
		if (!this._nodes.has(nodeFrom)) throw new EvalError(`Node From does not exist. Got ${nodeFrom}`);
		if (!this._nodes.has(nodeTo)) throw new EvalError(`Node To does not exist. Got ${nodeTo}`);
		if (typeof weight !== 'number') throw new TypeError(`Weight needs to be a number. Got ${weight}`);

		this._nodes.get(nodeFrom)!.set(nodeTo, weight);
		if (!this._directed) this._nodes.get(nodeTo)!.set(nodeFrom, weight);

		return this;
	}


	/**
	 * Delete edge connecting 2 nodes.
	 * @param {number} nodeFrom Start node id of edge.
	 * @param {number} nodeTo Connected node id of edge.
	 * @returns {this}
	 */
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
	 * Get graph data represented as an adjacency matrix.
	 * @returns {number[][]}
	 */
	getAdjacencyMatrix(): number[][] {
		const numNodes = this.numNodes();
		const edges = this.getEdges();
		const matrix: number[][] = [];

		for (let i = 0; i < numNodes; i++) {
			matrix.push(new Array(numNodes).fill(Infinity));
		}

		for (const [ from, to, weight ] of edges) {
			matrix[from][to] = weight;
		}

		return matrix;
	}


	/**
	 * Get all node ids in graph.
	 * @returns {number[]}
	 */
	getNodes(): number[] {
		return [...this._nodes.keys()];
	}


	/**
	 * Get all edges in graph.
	 * @returns {[number, number, number][]}
	 */
	getEdges(): [number, number, number][] {
		const edges: [number, number, number][] = [];

		for (const node of this.getNodes()) {
			for (const [ connectedNode, weight ] of this.getEdgesOfNode(node)!) {
				edges.push([node, connectedNode, weight]);
			}
		}

		return edges;
	}


	/**
	 * Get edges for a given node id.
	 * @param {number} node 
	 * @returns {[number, number][]} Array of nodes connected to given node id and the edge weight
	 */
	getEdgesOfNode(node: number): [number, number][] | undefined {
		if (!this._nodes.has(node)) return undefined;
		return [...this._nodes.get(node)!.entries()];
	}
}