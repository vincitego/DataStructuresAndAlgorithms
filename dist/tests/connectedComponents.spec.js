import { ok } from 'assert';
import { AdjacencyList } from '../index.js';
import { connectedComponents } from "../index.js";
describe('Test Connected Components Algorithm', () => {
    it('Should output the same color for connected components', () => {
        const graph = new AdjacencyList(false, 18);
        graph.addEdge(0, 4).addEdge(0, 8).addEdge(0, 13).addEdge(0, 14);
        graph.addEdge(1, 5);
        graph.addEdge(2, 9).addEdge(2, 15);
        graph.addEdge(3, 9);
        graph.addEdge(4, 8);
        graph.addEdge(5, 16).addEdge(5, 17);
        graph.addEdge(6, 7).addEdge(6, 11);
        graph.addEdge(7, 11);
        graph.addEdge(8, 14);
        graph.addEdge(9, 15);
        graph.addEdge(10, 15);
        graph.addEdge(13, 14);
        const components = connectedComponents(graph);
        const expectedResults = [1, 2, 3, 3, 1, 2, 4, 4, 1, 3, 3, 4, 5, 1, 1, 3, 2, 2];
        ok(expectedResults.length === components.length);
        for (let i = expectedResults.length - 1; i >= 0; i--) {
            ok(components[i] === expectedResults[i]);
        }
    });
});
