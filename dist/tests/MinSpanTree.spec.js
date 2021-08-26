import { ok } from 'assert';
import { MinSpanTree } from '../index.js';
describe('Test Minimum Spanning Tree', () => {
    it('New MinSpanTree should be initialized correctly', () => {
        const mst = new MinSpanTree();
        ok(mst.edgeCount() === 0);
        try {
            mst.findMinimum();
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.treeWeight();
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
    it('Pass through functions to disjoint set should work normally', () => {
        const mst = new MinSpanTree();
    });
    it('Should add new edges correctly', () => {
        const mst = new MinSpanTree();
        mst.addNode(0);
        mst.addNode(1);
        mst.addEdge(0, 1, 3);
        ok(mst.edgeCount() === 1);
        for (const [index1, index2, weight, inTree] of mst) {
            ok(index1 === 0);
            ok(index2 === 1);
            ok(weight === 3);
            ok(!inTree);
        }
    });
    it('Should correctly find minimum spanning tree', () => {
        const mst = new MinSpanTree();
        for (let i = 0; i < 10; i++)
            mst.addNode(i);
        mst.addEdge(0, 4, 1);
        mst.addEdge(0, 3, 9);
        mst.addEdge(0, 1, 5);
        mst.addEdge(4, 3, 2);
        mst.addEdge(4, 5, 1);
        mst.addEdge(5, 3, 5);
        mst.addEdge(5, 6, 7);
        mst.addEdge(6, 3, 11);
        mst.addEdge(6, 7, 1);
        mst.addEdge(6, 8, 4);
        mst.addEdge(8, 7, 6);
        mst.addEdge(8, 2, 1);
        mst.addEdge(8, 9, 0);
        mst.addEdge(9, 2, 8);
        mst.addEdge(2, 7, 4);
        mst.addEdge(2, 1, 4);
        mst.addEdge(1, 3, 2);
        mst.addEdge(3, 7, 2);
        ok(mst.edgeCount() === 18);
        const expectedEdges = [
            [8, 9],
            [0, 4],
            [4, 5],
            [6, 7],
            [8, 2],
            [4, 3],
            [1, 3],
            [3, 7],
            [6, 8],
        ];
        const mstResults = mst.findMinimum();
        ok(mst.minEdgeCount() === 9);
        ok(mst.treeWeight() === 14);
        for (let i = 0; i < 9; i++) {
            ok(mstResults[i][0] === expectedEdges[i][0]);
            ok(mstResults[i][1] === expectedEdges[i][1]);
        }
    });
    it('Trying to add invalid edges should error', () => {
        const mst = new MinSpanTree();
        mst.addNode(0);
        mst.addNode(1);
        try {
            mst.addEdge(-1, 0, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.addEdge(0, -1, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.addEdge('a', 0, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.addEdge(0, 'a', 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.addEdge(0, 0, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            mst.addEdge(0, 1, 'a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
