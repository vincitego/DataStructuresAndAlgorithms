import { AdjacencyList } from '../index.js';


/**
 * Finds all pair shortest paths using Floyd Warshall algorithm. Only use with a graph that has no gaps in the node ids.
 * @param {AdjacencyList} graph Graph represented as adjacency list
 * @returns {number[][]} Path of next nodes to traverse if a path exists for all pairs of nodes
 */
 export function floydWarshall(graph: AdjacencyList): number[][] {
	 const numNodes = graph.numNodes();
	 const memo: number[][] = graph.getAdjacencyMatrix();
	 const next: number[][] = [];

	for (let i = 0; i < numNodes; i++) {
		next.push([]);

		for (let j = 0; j < numNodes; j++) {
			next[i].push(memo[i][j] === Infinity ? Infinity : j);
		}
	}


	for (let k = 0; k < numNodes; k++) {
		for (let i = 0; i < numNodes; i++) {
			for (let j = 0; j < numNodes; j++) {
				const newPathWeight = memo[i][k] + memo[k][j];

				if (newPathWeight < memo[i][j]) {
					memo[i][j] = newPathWeight;
					next[i][j] = next[i][k];
				}
			}
		}
	}


	// run again to determine negative cycles
	for (let k = 0; k < numNodes; k++) {
		for (let i = 0; i < numNodes; i++) {
			for (let j = 0; j < numNodes; j++) {
				const newPathWeight = memo[i][k] + memo[k][j];

				if (newPathWeight < memo[i][j]) {
					memo[i][j] = -Infinity;
					next[i][j] = -Infinity;
				}
			}
		}
	}


	return next;
 }