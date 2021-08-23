import { DisjointSet } from "../index.js";
export class MinSpanTree extends DisjointSet {
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
