import { DisjointSet } from "../index.js";


export class MinSpanTree<T> implements Iterable<[number, number, number, boolean]> {
	public disjointSet: DisjointSet<T>;
	private _edges: [number, number, number, boolean][];
	private _edgesInForest: number;


	/**
	 * Minimum Spanning Tree implementation using Kruskal's Algorithm
	 * Add nodes to <MinSpanTree>.disjointSet
	 * Add edges using <MinSpanTree>.add()
	 */
	constructor() {
		this.disjointSet = new DisjointSet<T>();
		this._edges = [];
		this._edgesInForest = 0;
	}


	/**
	 * Adds an edge with a weight to the potential minimum spanning tree.
	 * You can not add any edges after calling the method getMinimum().
	 * @param {number} index1 Index of first node in edge.
	 * @param {number} index2 Index of second node in edge.
	 * @param {number} weight Weight of edge.
	 * @returns {MinSpanTree<T>} Returns self.
	 */
	addEdge(index1: number, index2: number, weight: number): MinSpanTree<T> {
		if (this._edgesInForest > 0) throw new SyntaxError('Can not add any more edges after running method findMinimum.');
		if (typeof weight !== 'number') throw new TypeError('Weight needs to be number.');
		if (typeof index1 !== 'number' || typeof index2 !== 'number') throw new TypeError('Index needs to be number.');
		if (index1 === index2) throw new SyntaxError('Indexes should not be the same');
		if (index1 < 0 || index1 >= this.disjointSet.size() || index2 < 0 || index2 >= this.disjointSet.size()) throw new RangeError('Index out of range.');

		this._edges.push([index1, index2, weight, false]);
		return this;
	}


	/**
	 * Calculates the minimum spanning tree given the edge data.
	 * @returns {[number, number, number, boolean][]} An array of the edge data in the minimum spanning tree. [index1, index2, weight, isInMinimumSpanningTree]
	 */
	getMinimum(): [number, number, number, boolean][] {
		if(this._edges.length === 0) throw new RangeError('No edges have been added.');

		const getValidEdges = () => this._edges.filter(edgeData => edgeData[3]);
		if (this._edgesInForest > 0) return getValidEdges();

		this._edges.sort((a, b) => a[2] - b[2]);

		for (const edgeData of this._edges) {
			const [index1, index2] = edgeData;

			if (this.disjointSet.union(index1, index2)) {
				edgeData[3] = true;
				this._edgesInForest++;
			}
		}

		return getValidEdges();
	}


	/**
	 * Gets all edges that have been added.
	 * @returns [number, number, number, boolean][] An array of all edge data. [index1, index2, weight, isInMinimumSpanningTree]
	 */
	getAllEdges(): [number, number, number, boolean][] {
		return this._edges;
	}


  /**
   * Iterator to allow looping of edges.
   */
	 *[Symbol.iterator](): Iterator<[number, number, number, boolean]> {
    for (const edgeData of this._edges) {
      yield edgeData;
    }
  }
}