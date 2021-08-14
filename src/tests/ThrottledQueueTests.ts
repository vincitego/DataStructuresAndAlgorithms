import { ok } from 'assert';
import { ThrottledQueue } from '../DataStructures/ThrottledQueue.js';
import { sleep } from '../utility/utility.js';


describe('ThrottledQueue in error mode test 1', () => {
	it('Should error out after putting too many requests into queue', async () => {
		const newTQ = new ThrottledQueue(5, 1000, 'error');

		for (let i = 1; i <= 10; i++) {
			try {
				await newTQ.add(console.info.bind(null, i));
			} catch (err) {
				ok(true);
				return;
			}
		}

		ok(false);
	});
});


describe('ThrottledQueue in error mode test 2', () => {
	it('Should not error out after putting too many requests into queue due to inserted sleep', async () => {
		const newTQ = new ThrottledQueue(5, 1000, 'error');

		for (let i = 1; i <= 5; i++) {
			try {
				await newTQ.add(console.info.bind(null, i));
			} catch (err) {
				ok(false);
			}
		}

		await sleep(1000);

		for (let i = 1; i <= 5; i++) {
			try {
				await newTQ.add(console.info.bind(null, i));
			} catch (err) {
				ok(false);
			}
		}

		ok(true);
	});
});


describe('ThrottledQueue in delay mode', () => {
	it('Should take about a little more than a second to complete', async () => {
		const newTQ = new ThrottledQueue(5, 1000, 'delay');
		const timeStart = Date.now();

		for (let i = 1; i <= 10; i++) {
			try {
				await newTQ.add(console.info.bind(null, i));
			} catch (err) {
				ok(false);
			}
		}

		ok(Date.now() - timeStart >= 1000);
	});
});