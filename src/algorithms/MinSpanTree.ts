import { DisjointSet } from "../index.js";


export class MinSpanTree<T> extends DisjointSet<T> {
	private _data: DisjointSet<T>;
	private _edges: [T, T][];
	private _weights: number[];
	private _edgeInForest: boolean[];


	/**
	 * Minimum Spanning Tree implementation using Kruskal's Algorithm
	 */
	constructor() {
		super();

		this._data = new DisjointSet<T>();
		this._edges = [];
		this._weights = [];
		this._edgeInForest = [];
	}
}