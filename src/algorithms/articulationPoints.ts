import { AdjacencyList } from '../index.js';


/**
 * Find articulation points in a graph.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {number[]} Array of articulation points
 */
export function findArticulationPoints(graph: AdjacencyList): number[] {
	const articulationPoints = new Set<number>();
	const nodes = graph.getNodes();
	const ids = new Map<number, number>(nodes.map(node => [node, 0]));
	const lowLinks = new Map<number, number>(nodes.map(node => [node, 0]));
	const visited = new Map<number, boolean>(nodes.map(node => [node, false]));
	let id = 0;

	for (const node of nodes) {
		if (visited.get(node)) continue;

		const dfsResult = depthFirst(graph, node, node, ids, lowLinks, visited, id, articulationPoints, -1, 0);
		const outEdgeCount = dfsResult[1];
		id = dfsResult[0];

		if (outEdgeCount > 1) {
			articulationPoints.add(node);
		} else {
			articulationPoints.delete(node);
		}
	}

	return [...articulationPoints.values()];
}


/**
 * Depth first search through graph to find articulation points
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @param {number} root Id of root node
 * @param {number} node Id of node to visit
 * @param {Map<number, number>} ids Map of node ids to depth first search id
 * @param {Map<number, number>} lowLinks Map of node ids and their low link value
 * @param {Map<number, number>} visited Map of node ids visited
 * @param {number} id Current value of depth first search id
 * @param {Set<number>} articulationPoints Array of articulation points
 * @param {number} parent Node id of parent to avoid evaluating on in case of an edge back to where search came from
 * @returns {number} Depth first search id left off at.
 */
function depthFirst(graph: AdjacencyList, root: number, node: number, ids: Map<number, number>, lowLinks: Map<number, number>, visited: Map<number, boolean>, id: number, articulationPoints: Set<number>, parent: number, outEdgeCount: number): [number, number] {
	let currentId = id + 1;
	let newOutEdgeCount = outEdgeCount;

	if (root === parent) newOutEdgeCount++;
	visited.set(node, true);
	ids.set(node, currentId);
	lowLinks.set(node, currentId);

	for (const [connectedNode] of graph.getEdgesOfNode(node)!) {
		if (connectedNode === parent) continue;

		if (visited.get(connectedNode)) {
			lowLinks.set(node, Math.min(lowLinks.get(node)!, ids.get(connectedNode)!));
		} else {
			const dfsResult = depthFirst(graph, root, connectedNode, ids, lowLinks, visited, currentId, articulationPoints, node, newOutEdgeCount);
			currentId = dfsResult[0];
			newOutEdgeCount = dfsResult[1];
			lowLinks.set(node, Math.min(lowLinks.get(node)!, lowLinks.get(connectedNode)!));

			if (ids.get(node)! <= lowLinks.get(connectedNode)!) {
				articulationPoints.add(node);
			}
		}
	}

	return [currentId, newOutEdgeCount];
}