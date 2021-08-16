var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sleep } from '../utility/utility.js';
import { LinkedList } from './LinkedList.js';
export var THROTTLED_QUEUE_MODE;
(function (THROTTLED_QUEUE_MODE) {
    THROTTLED_QUEUE_MODE[THROTTLED_QUEUE_MODE["DELAY"] = 0] = "DELAY";
    THROTTLED_QUEUE_MODE[THROTTLED_QUEUE_MODE["ERROR"] = 1] = "ERROR";
})(THROTTLED_QUEUE_MODE || (THROTTLED_QUEUE_MODE = {}));
export class ThrottledQueue {
    /**
     * Creates new Throttled Queue
     * @param {number} maxItems Max number of items per time window.
     * @param {number} timeWindow Length of time window in milliseconds.
     * @param {THROTTLED_QUEUE_MODE} mode Indicates whether to error out or delay execution of function when exceeding threshhold.
     */
    constructor(maxItems, timeWindow, mode = THROTTLED_QUEUE_MODE.DELAY) {
        if (typeof maxItems !== 'number')
            throw new TypeError('maxItems must be a number.');
        if (typeof timeWindow !== 'number')
            throw new TypeError('timeWindow must be a number.');
        if (maxItems <= 0)
            throw new RangeError('Max requests must be a positive integer');
        if (timeWindow <= 0)
            throw new RangeError('Timeframe in milliseconds must be a positive integer');
        this._maxItems = maxItems;
        this._timeWindow = timeWindow;
        this._mode = mode;
        this._delayedSize = 0;
        this._finishedQueue = new LinkedList();
    }
    /**
     * Adds a new function callback to the Throttle Queue.
     * Will resovle immediately if limit has not been hit.
     * Will error or delay function execution based on operating mode.
     * @param {function} callback Function to call.
     * @param {any} args Arguments to pass to the function.
     * @returns {Promise<T>} Promise of callback results.
     */
    add(callback, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeOldRequests();
            if (this._finishedQueue.size() >= this._maxItems) {
                if (this._mode === THROTTLED_QUEUE_MODE.ERROR)
                    throw new Error(`Throttle limit reached: ${this._maxItems} per ${this._timeWindow / 1000} seconds.`);
                this._delayedSize++;
                do {
                    let timeToNext = this._finishedQueue.peekFront() + this._timeWindow + this._delayedSize - Date.now();
                    if (timeToNext <= 0)
                        timeToNext = 1;
                    yield sleep(timeToNext);
                    this.removeOldRequests();
                } while (this._finishedQueue.size() >= this._maxItems);
                this._delayedSize--;
            }
            this._finishedQueue.addBack(Date.now());
            return callback(...args);
        });
    }
    /**
     * If operating in delay mode, returns the number of function calls that have been delayed by the throttle.
     * @returns {number} Number of function calls delayed
     */
    getDelayedSize() {
        return this._delayedSize;
    }
    /**
     * Get number of function calls available before hitting throttle.
     * @returns {number} Number of function calls avaiable before hitting throttle.
     */
    getRemainingSize() {
        this.removeOldRequests();
        return this._maxItems - this._finishedQueue.size();
    }
    /**
     * Cleans up processed requests that have exceeded current time window.
     */
    removeOldRequests() {
        const startTimeframe = Date.now() - this._timeWindow;
        while (this._finishedQueue.peekFront() !== null && this._finishedQueue.peekFront() < startTimeframe) {
            this._finishedQueue.removeFront();
        }
    }
}
