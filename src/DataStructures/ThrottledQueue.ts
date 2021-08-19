import { sleep } from '../utility/utility.js';
import { LinkedList } from './LinkedList.js';


export enum THROTTLED_QUEUE_MODE {
	DELAY = 0,
	ERROR = 1,
}


export class ThrottledQueue {
	private _maxItems: number;
	private _timeWindow: number;
	private _mode: THROTTLED_QUEUE_MODE;
	private _finishedQueue: LinkedList<number>;
	public delayedQueue: LinkedList<any>;


	/**
	 * Creates new Throttled Queue
	 * @param {number} maxItems Max number of items per time window.
	 * @param {number} timeWindow Length of time window in milliseconds.
	 * @param {THROTTLED_QUEUE_MODE} mode Indicates whether to error out or delay execution of function when exceeding threshhold.
	 */
	constructor(maxItems: number, timeWindow: number, mode: THROTTLED_QUEUE_MODE = THROTTLED_QUEUE_MODE.DELAY) {
		if (typeof maxItems !== 'number') throw new TypeError('maxItems must be a number.');
		if (typeof timeWindow !== 'number') throw new TypeError('timeWindow must be a number.');
		if (maxItems <= 0) throw new RangeError('Max requests must be a positive integer');
		if (timeWindow <= 0) throw new RangeError('Timeframe in milliseconds must be a positive integer');
		if (mode !== THROTTLED_QUEUE_MODE.DELAY && mode !== THROTTLED_QUEUE_MODE.ERROR) throw new TypeError('Invalid throttled queue mode specified');

		this._maxItems = maxItems;
		this._timeWindow = timeWindow;
		this._mode = mode;
		this._finishedQueue = new LinkedList();
		this.delayedQueue = new LinkedList();
	}


	/**
	 * Adds a new function callback to the Throttle Queue.
	 * Will resovle immediately if limit has not been hit.
	 * Will error or delay function execution based on operating mode.
	 * @param {function} callback Function to call.
	 * @param {any} args Arguments to pass to the function.
	 * @returns {Promise<T>} Promise of callback results.
	 */
	async add<T>(callback: (...args: any[]) => T, thisToBind: any, ...args: any[]): Promise<T> {
		const boundCallback = callback.bind(thisToBind, ...args);
		this.removeOldRequests();


		if (this._finishedQueue.size() >= this._maxItems) {
			if (this._mode === THROTTLED_QUEUE_MODE.ERROR)
				throw new Error(`Throttle limit reached: ${this._maxItems} per ${this._timeWindow/1000} seconds.`);


			this.delayedQueue.addBack(boundCallback);

			do {
				const timeToNext: number = Math.min(1, this._finishedQueue.peekFront()! + this._timeWindow - Date.now());
				await sleep(timeToNext);
				this.removeOldRequests();
			} while (this._finishedQueue.size() >= this._maxItems || this.delayedQueue.peekFront() !== boundCallback);

			this.delayedQueue.removeFront();
		}


		this._finishedQueue.addBack(Date.now());
		return boundCallback();
	}


	/**
	 * If operating in delay mode, returns the number of function calls that have been delayed by the throttle.
	 * @returns {number} 
	 */
	getDelayedSize(): number {
		return this.delayedQueue.size();
	}


	/**
	 * Get number of function calls available before hitting throttle.
	 * @returns {number} 
	 */
	getRemainingSize(): number {
		this.removeOldRequests();
		return this._maxItems - this._finishedQueue.size();
	}


	/**
	 * Cleans up processed requests that have exceeded current time window.
	 */
	removeOldRequests(): void {
		const startTimeframe: number = Date.now() - this._timeWindow;

		while (this._finishedQueue.peekFront() !== null && this._finishedQueue.peekFront()! < startTimeframe) {
			this._finishedQueue.removeFront();
		}
	}
}