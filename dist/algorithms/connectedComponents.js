/**
 * Find and label connected components of the given graph.
 * @param {number[][]} graph Graph represented as adjacency list
 * @returns {number[]} Array representing component that nodes belong to
 */
export function connectedComponents(graph) {
    const nodeCount = graph.length;
    const components = new Array(nodeCount).fill(0);
    let color = 0;
    for (let node = 0; node < nodeCount; node++) {
        if (components[node] > 0)
            continue;
        color++;
        depthFirst(graph, node, color, components);
    }
    return components;
}
/**
 * Recursive depth first search of graph to mark connected components
 * @param {number[][]} graph Graph represented as adjacency list
 * @param {number} node Index of node to start search at
 * @param {number} color Number representing component to label nodes
 * @param {number} components Array representing component that nodes belong to
 */
function depthFirst(graph, node, color, components) {
    const nodeCount = graph.length;
    components[node] = color;
    for (const connectedNode of graph[node]) {
        if (typeof connectedNode !== 'number')
            throw new TypeError(`Connected node id ${connectedNode} needs to be numeric.`);
        if (connectedNode !== Math.floor(connectedNode))
            throw new TypeError(`Connected node id ${connectedNode} needs to be an integer.`);
        if (connectedNode >= nodeCount)
            throw new RangeError(`Connected node id ${connectedNode} is out of range.`);
        if (components[connectedNode] > 0)
            continue;
        depthFirst(graph, connectedNode, color, components);
    }
}
