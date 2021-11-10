import { AdjacencyList } from '../index.js';


/**
 * Find bridges in a graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {number[]} Pairs of edges forming a bridge in a flat array
 */
export function findBridges(graph: AdjacencyList): number[] {
	const bridges: number[] = [];
	const nodes = graph.getNodes();
	const ids = new Map<number, number>(nodes.map(node => [node, 0]));
	const lowLinks = new Map<number, number>(nodes.map(node => [node, 0]));
	const visited = new Map<number, boolean>(nodes.map(node => [node, false]));
	let id = 0;

	for (const node of nodes) {
		if (visited.get(node)) continue;
		id = depthFirst(graph, node, ids, lowLinks, visited, id, bridges, -1);
	}

	return bridges;
}


/**
 * Depth first search through graph to find bridges
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} node Id of node to visit
 * @param {Map<number, number>} ids Map of node ids to depth first search id
 * @param {Map<number, number>} lowLinks Map of node ids and their low link value
 * @param {Map<number, number>} visited Map of node ids visited
 * @param {number} id Current value of depth first search id
 * @param {number[]} bridges Array of bridges found in a flat array
 * @param {number} parent Node id of parent to avoid evaluating on in case of an edge back to where search came from
 * @returns {number} Depth first search id left off at.
 */
function depthFirst(graph: AdjacencyList, node: number, ids: Map<number, number>, lowLinks: Map<number, number>, visited: Map<number, boolean>, id: number, bridges: number[], parent: number): number {
	let currentId = id + 1;
	visited.set(node, true);
	ids.set(node, currentId);
	lowLinks.set(node, currentId);

	for (const [connectedNode] of graph.getEdgesOfNode(node)!) {
		if (connectedNode === parent) continue;

		if (visited.get(connectedNode)) {
			lowLinks.set(node, Math.min(lowLinks.get(node)!, ids.get(connectedNode)!));
		} else {
			currentId = depthFirst(graph, connectedNode, ids, lowLinks, visited, currentId, bridges, node);
			lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(connectedNode)!));

			if (ids.get(node)! < lowLinks.get(connectedNode)!) {
				bridges.push(node, connectedNode);
			}
		}
	}

	return currentId;
}