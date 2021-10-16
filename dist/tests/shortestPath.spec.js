import { ok } from 'assert';
import { shortestPath } from "../index.js";
describe('Test Shortest Path Algorithm', () => {
    it('Should output shortest path', () => {
        const graph = [
            [9, 7, 11],
            [10, 8],
            [12, 3],
            [2, 4, 7],
            [3],
            [6],
            [5, 7],
            [0, 11, 3, 6],
            [1, 9, 12],
            [10, 8, 0],
            [1, 9],
            [0, 7],
            [2, 8],
        ];
        const path = shortestPath(graph, 0, 4);
        const expectedResults = [0, 7, 3, 4];
        ok(expectedResults.length === path.length);
        for (let i = expectedResults.length - 1; i >= 0; i--) {
            ok(path[i] === expectedResults[i]);
        }
        const path2 = shortestPath(graph, 10, 10);
        ok((path2 === null || path2 === void 0 ? void 0 : path2.length) === 1);
        ok(path2[0] === 10);
    });
    it('Should output undefined for unconnected nodes', () => {
        const graph = [
            [9, 7, 11],
            [10, 8],
            [12, 3],
            [2, 7],
            [],
            [6],
            [5, 7],
            [0, 11, 3, 6],
            [1, 9, 12],
            [10, 8, 0],
            [1, 9],
            [0, 7],
            [2, 8],
        ];
        const path = shortestPath(graph, 0, 4);
        ok(path === undefined);
    });
    it('Invalid graphs should error', () => {
        try {
            const graph = [
                [4, 8, 13, 14],
                [5],
            ];
            shortestPath(graph, 0, 4);
            ok(false);
        }
        catch (err) {
            ok(true);
        }
        try {
            const graph = [
                ['a'],
                [0],
            ];
            shortestPath(graph, 0, 4);
            ok(false);
        }
        catch (err) {
            ok(true);
        }
        try {
            const graph = [
                [1.1],
                [0],
            ];
            shortestPath(graph, 0, 4);
            ok(false);
        }
        catch (err) {
            ok(true);
        }
    });
});
