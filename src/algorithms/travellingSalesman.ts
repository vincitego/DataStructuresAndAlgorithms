import { AdjacencyList } from '../index.js';


/**
 * Travelling salesman implementation.
 * @param {AdjacencyList} graph Graph represented as an adjacency list
 * @param {number} start Node id to start tour on
 * @returns {number[]} Tour as array of node ids if one exists
 */
export function travellingSalesman(graph: AdjacencyList, start: number): number[] {
	const path = [start];
	const numNodes = graph.numNodes();
	const matrix = graph.getAdjacencyMatrix();

	if (numNodes > 32) throw new RangeError(`Too many nodes for this algorithm, max 32, got ${numNodes}`);


	const memo: number[][] = Array.from({length: numNodes}).map(() => new Array(2 ^ numNodes).fill(Infinity));

	// set up initial memo table of start node to all other nodes
	for (let i = 0; i < numNodes; i++) {
		if (i === start) continue;

		const memoKey = (1 << start) | (1 << i);
		memo[i][memoKey] = matrix[start][i];
	}


	// build up memo table one additional node in length at a time
	for (let i = 3; i <= numNodes; i++) {

		// loop all bit combinations of n bits that have been set
		for (const memoKey of bitCombinations(i, numNodes)) {
			if (!isBitSet(start, memoKey)) continue;

			// loop all set bits
			for (let nextNode = 0; nextNode < numNodes; nextNode++) {
				if (nextNode === start || !isBitSet(nextNode, memoKey)) continue;

				const memoKeyWithoutNext = memoKey ^ (1 << nextNode);
				let minDistance = Infinity;

				// loop all possible end nodes of set bits
				for (let endNode = 0; endNode < numNodes; endNode++) {
					if (endNode === start || endNode === nextNode || !isBitSet(endNode, memoKey)) continue;

					const newDistance = memo[endNode][memoKeyWithoutNext] + matrix[endNode][nextNode];
					if (newDistance < minDistance) minDistance = newDistance;
				}

				memo[nextNode][memoKey] = minDistance;
			}
		}
	}


	// find min cost tour
	let state = (1 << numNodes) - 1;
	let minCostTour = Infinity;
	let lastIndex = start;

	for (let endNode = 0; endNode < numNodes; endNode++) {
		if (endNode === start) continue;
		const tourCost = memo[endNode][state];
		if (tourCost < minCostTour) minCostTour = tourCost;
	}

	for (let i = numNodes - 1; i >= 1; i--) {
		let index = -1;

		for (let j = 0; j < numNodes; j++) {
			if (j === start || !isBitSet(j, state)) continue;
			if (index === -1) index = j;

			const prevDistance = memo[index][state] + matrix[index][lastIndex];
			const newDistance = memo[j][state] + matrix[j][lastIndex];

			if (newDistance < prevDistance) index = j;
		}

		path.push(index);
		state ^= 1 << index;
		lastIndex = index;
	}


	path.push(start);
	return path.length === 2 ? [] : path.reverse();
}


function bitCombinations(numBits: number, length: number, currentValue = 0, bitLocation = 0, combinations: number[] = []): number[] {
	if (numBits === 0) {
		combinations.push(currentValue);
	} else {
		for (let i = bitLocation; i < length; i++) {
			currentValue |= 1 << i;
			bitCombinations(numBits - 1, length, currentValue, i + 1, combinations);
			currentValue &= ~(1 << i);
		}
	}

	return combinations;
}


function isBitSet(bitLocation: number, value: number): boolean {
	return ((1 << bitLocation) & value) > 0;
}