import { DisjointSet } from "../index.js";
/**
 * Minimum Spanning Tree implementation using Kruskal's Algorithm
 */
export class MinimumSpanningTree {
    /**
     * Creates new Minimum Spanning Tree
     * Add nodes to <MinimumSpanningTree>.disjointSet
     * Add edges using <MinimumSpanningTree>.add()
     */
    constructor() {
        this._disjointSet = new DisjointSet();
        this._edges = [];
        this._edgesInForest = [];
        this._treeWeight = 0;
    }
    /**
     * Adds an edge with a weight to the potential minimum spanning tree.
     * You can not add any edges after calling the method getMinimum().
     * @param {number} index1 Index of first node in edge.
     * @param {number} index2 Index of second node in edge.
     * @param {number} weight Weight of edge.
     * @returns {MinimumSpanningTree<T>} Returns self.
     */
    addEdge(index1, index2, weight) {
        if (this._edgesInForest.length > 0)
            throw new SyntaxError('Can not add any more edges after running method findMinimum.');
        if (typeof weight !== 'number')
            throw new TypeError('Weight needs to be number.');
        if (typeof index1 !== 'number' || typeof index2 !== 'number')
            throw new TypeError('Index needs to be number.');
        if (index1 === index2)
            throw new SyntaxError('Indexes should not be the same');
        if (index1 < 0 || index1 >= this._disjointSet.size() || index2 < 0 || index2 >= this._disjointSet.size())
            throw new RangeError('Index out of range.');
        this._edges.push([index1, index2, weight, false]);
        return this;
    }
    /**
     * Calculates the minimum spanning tree given the edge data.
     * @returns {[number, number, number, boolean][]} An array of the edge data in the minimum spanning tree. [index1, index2, weight, isInMinimumSpanningTree]
     */
    findMinimum() {
        if (this._edges.length === 0)
            throw new RangeError('No edges have been added.');
        if (this._edgesInForest.length > 0)
            return this._edgesInForest;
        this._edges.sort((a, b) => a[2] - b[2]);
        for (const edgeData of this._edges) {
            const [index1, index2, weight] = edgeData;
            if (this._disjointSet.union(index1, index2)) {
                edgeData[3] = true;
                this._edgesInForest.push(edgeData);
                this._treeWeight += weight;
            }
        }
        return this._edgesInForest;
    }
    /**
     * Gets all edges that have been added.
     * @returns [number, number, number, boolean][] An array of all edge data. [index1, index2, weight, isInMinimumSpanningTree]
     */
    getEdges() {
        return this._edges;
    }
    /**
     * Get count of all edges.
     * @returns {number}
     */
    edgeCount() {
        return this._edges.length;
    }
    /**
     * Get count of edges in minimum spanning tree.
     * @returns {number}
     */
    minEdgeCount() {
        if (this._edgesInForest.length === 0)
            throw new SyntaxError('Need to call method getMinimum() first.');
        return this._edgesInForest.length;
    }
    /**
     * Get total weight of the minimum spanning tree.
     * @returns {number}
     */
    treeWeight() {
        if (this._edgesInForest.length === 0)
            throw new SyntaxError('Need to call method getMinimum() first.');
        return this._treeWeight;
    }
    /**
     * Pass through function to add a value to disjoint set.
     * @param value
     * @returns {MinimumSpanningTree<T>} Returns self.
     */
    addNode(value) {
        this._disjointSet.add(value);
        return this;
    }
    peekNode() {
    }
    findNodeIndex() {
    }
    nodeCount() {
    }
    componentCount() {
    }
    componentSize() {
    }
    getNodes() {
    }
    /**
     * Iterator to allow looping of edges.
     */
    *[Symbol.iterator]() {
        for (const edgeData of this._edges) {
            yield edgeData;
        }
    }
}
