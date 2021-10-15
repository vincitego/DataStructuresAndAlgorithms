export function connectedComponents(graph: number[][]): number[] {
	const nodeCount = graph.length;
	const components: number[] = new Array(nodeCount).fill(0);
	let color = 0;

	for (let node = 0; node < nodeCount; node++) {
		if (components[node] > 0) continue;
		color++;
		depthFirst(graph, node, color, components);
	}

	return components;
}


function depthFirst(graph: number[][], node: number, color: number, components: number[]): void {
	const nodeCount = graph.length;
	components[node] = color;
	
	for (const connectedNode of graph[node]) {
		if (typeof connectedNode !== 'number') throw new TypeError(`Connected node id ${connectedNode} needs to be numeric.`);
		if (connectedNode !== Math.floor(connectedNode)) throw new TypeError(`Connected node id ${connectedNode} needs to be an integer.`);
		if (connectedNode >= nodeCount) throw new RangeError(`Connected node id ${connectedNode} is out of range.`);

		if (components[connectedNode] > 0) continue;
		depthFirst(graph, connectedNode, color, components);
	}
}