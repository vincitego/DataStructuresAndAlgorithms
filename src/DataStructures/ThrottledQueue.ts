import { sleep } from '../utility/utility.js';
import { LinkedList } from './LinkedList.js';


export enum THROTTLED_QUEUE_MODE {
	DELAY = 'delay',
	ERROR = 'error',
}


export class ThrottledQueue {
	protected _maxRequests: number;
	protected _perMsTimeframe: number;
	protected _opMode: string;

	protected _finishedQueue: LinkedList<number>;
	protected _delayedSize: number;


	constructor(maxRequests: number, perMsTimeframe: number, opMode: THROTTLED_QUEUE_MODE = THROTTLED_QUEUE_MODE.DELAY) {
		if (maxRequests <= 0) throw new Error('Max requests must be a positive integer');
		if (perMsTimeframe <= 0) throw new Error('Timeframe in milliseconds must be a positive integer');

		this._maxRequests = maxRequests;
		this._perMsTimeframe = perMsTimeframe;
		this._opMode = opMode;
		this._finishedQueue = new LinkedList();
		this._delayedSize = 0;
	}


	async add<T>(funcToCall: (...args: any[]) => T): Promise<T> {
		if (this.size() >= this._maxRequests) {

			if (this._opMode === THROTTLED_QUEUE_MODE.ERROR) {
				const errMessage = `Throttle limit reached: ${this._maxRequests} per ${this._perMsTimeframe/1000} seconds.`;
				throw new Error(errMessage);

			} else {
				this._delayedSize++;

				do {
					let timeToNext: number = this._finishedQueue.peekFront()! + this._perMsTimeframe + this._delayedSize - Date.now();
					if (timeToNext <= 0) timeToNext = 1;
					await sleep(timeToNext);
				} while (this.size() >= this._maxRequests);

				this._delayedSize--;
				this._finishedQueue.addBack(Date.now());
				return funcToCall();
			}

		} else {
			this._finishedQueue.addBack(Date.now());
			return funcToCall();
		}
	}


	removeOldRequests(): void {
		const startTimeframe: number = Date.now() - this._perMsTimeframe;

		while (this._finishedQueue.peekFront() !== null && this._finishedQueue.peekFront()! < startTimeframe) {
			this._finishedQueue.removeFront();
		}
	}


	size(): number {
		this.removeOldRequests();
		return this._finishedQueue.size();
	}


	delayedSize(): number {
		return this._delayedSize;
	}
}