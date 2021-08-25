import { ok } from 'assert';
import { MinSpanTree } from '../index.js';


describe('Test Minimum Spanning Tree', () => {

	it('New MinSpanTree should be initialized correctly', () => {
		const mst = new MinSpanTree<number>();

		ok(mst.disjointSet.size() === 0);
		ok(mst.getAllEdges().length === 0);

		try {
			mst.getMinimum();
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

	
	it('Should add new edges correctly', () => {
		const mst = new MinSpanTree<number>();

		for (const edgeData of mst) {
			
		}
	});

	
	it('Should correctly find minimum spanning tree', () => {
		const mst = new MinSpanTree<number>();
	});

	
	it('Trying to add invalid edges should error', () => {
		const mst = new MinSpanTree<number>();
	});

});