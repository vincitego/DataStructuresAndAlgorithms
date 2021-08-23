import { DisjointSet } from "../index.js";


export class MinSpanTree<T> extends DisjointSet<T> {
	private _edges: [number, number][];
	private _weights: number[];
	private _edgeInForest: boolean[];


	/**
	 * Minimum Spanning Tree implementation using Kruskal's Algorithm
	 */
	constructor() {
		super();

		this._edges = [];
		this._weights = [];
		this._edgeInForest = [];
	}
}