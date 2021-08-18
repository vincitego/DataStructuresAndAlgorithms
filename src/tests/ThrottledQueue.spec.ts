import { ok } from 'assert';
import { ThrottledQueue, enums } from '../index.js';
import { sleep } from '../utility/utility.js';


describe('Test Throttled Queue in Error mode', () => {
	it('Should error out after putting too many requests into queue', async () => {
		const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.ERROR);

		for (let i = 1; i <= 10; i++) {
			try {
				ok(i === await tq.add<number>(val => val, i));
				ok(tq.getRemainingSize() === (5 - i));
			} catch (err) {
				ok(true);
				return;
			}
		}

		ok(false);
	});

	
	it('Should not error out after putting too many requests into queue due to manually inserted sleep', async () => {
		const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.ERROR);

		for (let i = 1; i <= 5; i++) {
			try {
				ok(i === await tq.add<number>(val => val, i));
				ok(tq.getRemainingSize() === (5 - i));
			} catch (err) {
				ok(false);
			}
		}

		await sleep(1100);

		for (let i = 1; i <= 5; i++) {
			try {
				ok(i === await tq.add<number>(val => val, i));
				ok(tq.getRemainingSize() !== 5);
			} catch (err) {
				ok(false);
			}
		}

		ok(true);
	});
});
	

describe('Test Throttled Queue in Delay mode', () => {
	it('Should take about a little more than a second to complete', async () => {
		const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
		const shouldBeDelayedPromises: Promise<number>[] = [];
		const timeStart = performance.now();

		for (let i = 1; i <= 5; i++) {
			try {
				ok(i === await tq.add<number>(val => val, i));
				ok(tq.getRemainingSize() === (5 - i));
			} catch (err) {
				ok(false);
			}
		}

		for (let i = 1; i <= 5; i++) {
			try {
				shouldBeDelayedPromises.push(tq.add<number>(val => val, i));
				ok(tq.getDelayedSize() === i);
				ok(tq.getRemainingSize() === 0);
			} catch (err) {
				ok(false);
			}
		}

		await Promise.all(shouldBeDelayedPromises);
		ok(performance.now() - timeStart >= 1000);
	});
	

	it('Should error out when trying to create invalid throttled queues', async () => {
		try {
			const tq = new ThrottledQueue(0, 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const tq = new ThrottledQueue(5, 0, enums.THROTTLED_QUEUE_MODE.DELAY);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const tq = new ThrottledQueue('a' as any, 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const tq = new ThrottledQueue(5, 'a' as any, enums.THROTTLED_QUEUE_MODE.DELAY);
			ok(false);
		} catch (error) {
			ok(true);
		}
		
		try {
			const tq = new ThrottledQueue(5, 1000, 3);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});
});