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
     * You can not add any edges after calling the method getMinimum(). O(1)
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
     * Calculates the minimum spanning tree given the edge data. O(nlogn)
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
     * Gets all edges that have been added. O(1)
     * @returns [number, number, number, boolean][] An array of all edge data. [index1, index2, weight, isInMinimumSpanningTree]
     */
    getEdges() {
        return this._edges;
    }
    /**
     * Get count of all edges. O(1)
     * @returns {number}
     */
    edgeCount() {
        return this._edges.length;
    }
    /**
     * Get count of edges in minimum spanning tree. O(1)
     * @returns {number}
     */
    minEdgeCount() {
        if (this._edgesInForest.length === 0)
            throw new SyntaxError('Need to call method getMinimum() first.');
        return this._edgesInForest.length;
    }
    /**
     * Get total weight of the minimum spanning tree. O(1)
     * @returns {number}
     */
    treeWeight() {
        if (this._edgesInForest.length === 0)
            throw new SyntaxError('Need to call method getMinimum() first.');
        return this._treeWeight;
    }
    /**
     * Pass through function to add a value to disjoint set. O(1)
     * @param value
     * @returns {MinimumSpanningTree<T>} Returns self.
     */
    addNode(value) {
        this._disjointSet.add(value);
        return this;
    }
    /**
     * Peek at value at a given index in the disjoint set. O(n)
     * @param index Index to peek at.
     * @returns {T}
     */
    peekNode(index) {
        return this._disjointSet.peek(index);
    }
    /**
   * Find index of first value matching given value or where given callback evaluates to true. O(n)
   * @param {} valueOrCallback
   * @returns {number}
     */
    findNodeIndex(valueOrCallback) {
        return this._disjointSet.findIndex(valueOrCallback);
    }
    /**
     * Return number of nodes in disjoint set. O(1)
     * @returns {number}
     */
    nodeCount() {
        return this._disjointSet.size();
    }
    /**
     * Returns number of components. O(1)
     * @returns {number}
     */
    componentCount() {
        return this._disjointSet.componentCount();
    }
    /**
     * Get the size of the component that the given index belongs to. O(1) amortized
     * @param {number} index Index of item whose component size you're looking for.
     * @returns {number}
     */
    componentSize(index) {
        return this._disjointSet.componentSize(index);
    }
    /**
     * Returns array of all nodes of the disjoint set. O(n)
     * @returns {T[]}
     */
    getNodes() {
        return Array.from(this._disjointSet);
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
