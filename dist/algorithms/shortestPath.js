import { LinkedList } from '../index.js';
/**
 * Finds shortest path between a given start node and end node.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} start Node index to start path on
 * @param {number} end Node index to end path on
 * @returns {number[] | undefined} Path of nodes to traverse if a path exists
 */
export function shortestPath(graph, start, end) {
    const nodeCount = graph.numNodes();
    if (typeof start !== 'number')
        throw new TypeError(`Start node id ${start} needs to be numeric.`);
    if (start !== Math.floor(start))
        throw new TypeError(`Start node id ${start} needs to be an integer.`);
    if (start >= nodeCount)
        throw new RangeError(`Start node id ${start} is out of range.`);
    if (typeof end !== 'number')
        throw new TypeError(`End node id ${end} needs to be numeric.`);
    if (end !== Math.floor(end))
        throw new TypeError(`End node id ${end} needs to be an integer.`);
    if (end >= nodeCount)
        throw new RangeError(`End node id ${end} is out of range.`);
    const previousNode = new Array(nodeCount).fill(-1);
    const queue = new LinkedList();
    previousNode[start] = start;
    queue.addBack(start);
    while (queue.size() > 0) {
        const currentNode = queue.removeFront();
        if (typeof currentNode !== 'number')
            throw new TypeError(`Node id ${currentNode} needs to be numeric.`);
        if (currentNode !== Math.floor(currentNode))
            throw new TypeError(`Node id ${currentNode} needs to be an integer.`);
        if (currentNode >= nodeCount)
            throw new RangeError(`Node id ${currentNode} is out of range.`);
        for (const [connectedNode] of graph.getEdges(currentNode)) {
            if (previousNode[connectedNode] >= 0)
                continue;
            previousNode[connectedNode] = currentNode;
            if (currentNode === end) {
                queue.clear();
                break;
            }
            queue.addBack(connectedNode);
        }
    }
    if (previousNode[end] < 0)
        return;
    const path = [];
    let pathNode = end;
    path.push(pathNode);
    while (pathNode !== start) {
        pathNode = previousNode[pathNode];
        path.push(pathNode);
    }
    return path.reverse();
}
