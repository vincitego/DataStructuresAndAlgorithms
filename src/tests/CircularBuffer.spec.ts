import { ok } from 'assert';
import { CircularBuffer, enums } from '../index.js';


describe('Test Circular Buffer in Error mode', () => {
	it('Initial circular buffer should be empty and fail on attempted read.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		ok(cb.maxSize() === 5);
		ok(cb.amountFilled() === 0);
		ok(cb.isBufferEmpty());
		ok(!cb.isBufferFull());

		try {
			cb.read();
			ok(false);
		} catch (error) {
			ok(true);
		}
	});
	

	it('Write one item should update values accordingly.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		cb.write(1);

		ok(cb.amountFilled() === 1);
		ok(!cb.isBufferEmpty());
		ok(!cb.isBufferFull());
	});

	
	it('Write to circular buffer followed by call to clear should empty the buffer.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		cb.write(1);
		cb.clear();

		ok(cb.amountFilled() === 0);
		ok(cb.isBufferEmpty());
	});

	
	it('Write one item followed by read should update values accordingly.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		cb.write(1);
		
		ok(cb.read() === 1);
		ok(cb.amountFilled() === 0);
		ok(cb.isBufferEmpty());
		ok(!cb.isBufferFull());
	});

	
	it('Write five items should fill up buffer.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		for (let i = 0; i < 5; i++) {
			cb.write(i);
			ok(cb.amountFilled() === i + 1);
		}
		
		ok(!cb.isBufferEmpty());
		ok(cb.isBufferFull());
	});

	
	it('Write five items and peeking should return or error as expected.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		for (let i = 0; i < 5; i++) {
			cb.write(i);
		}
		
		ok(cb.peek() === 0);
		ok(cb.peekAt(4) === 4);

		try {
			cb.peekAt(5);
			ok(false);
		} catch (error) {
			ok(true);
		}
	});

	
	it('Attempt to write six items should cause error.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		for (let i = 0; i < 6; i++) {
			try {
				cb.write(i);
				if (i === 5) ok(false);
			} catch (error) {
				ok(true);
				ok(i === 5);
			}
		}
	});

	
	it('Write five items and iterate through them.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
		for (let i = 0; i < 5; i++) {
			try {
				cb.write(i);
			} catch (error) {
				ok(false);
			}
		}

		let j = 0;
		for (const value of cb) {
			ok(j === value);
			j++;
		}
	});
});


describe('Test Circular Buffer in Overwrite mode', () => {
	it('Attempt to write six items should overwrite first element.', async () => {
		const cb = new CircularBuffer<number>(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
		for (let i = 0; i < 6; i++) {
			try {
				cb.write(i);
			} catch (error) {
				ok(false);
			}
		}

		ok(cb.isBufferFull());
		ok(cb.amountFilled() === 5);
		ok(cb.read() === 1);
	});
});