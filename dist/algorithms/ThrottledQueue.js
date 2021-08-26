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
import { LinkedList } from '../DataStructures/LinkedList.js';
export var THROTTLED_QUEUE_MODE;
(function (THROTTLED_QUEUE_MODE) {
    THROTTLED_QUEUE_MODE[THROTTLED_QUEUE_MODE["DELAY"] = 0] = "DELAY";
    THROTTLED_QUEUE_MODE[THROTTLED_QUEUE_MODE["ERROR"] = 1] = "ERROR";
})(THROTTLED_QUEUE_MODE || (THROTTLED_QUEUE_MODE = {}));
/**
 * Throttled Queue implementation that will only allow N number of function executions per millisecond time period.
 */
export class ThrottledQueue {
    /**
     * Creates new Throttled Queue.
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
        if (mode !== THROTTLED_QUEUE_MODE.DELAY && mode !== THROTTLED_QUEUE_MODE.ERROR)
            throw new TypeError('Invalid throttled queue mode specified');
        this._maxItems = maxItems;
        this._timeWindow = timeWindow;
        this._mode = mode;
        this._finishedQueue = new LinkedList();
        this.delayedQueue = new LinkedList();
    }
    /**
     * Adds a new function callback to the Throttle Queue.
     * Will resolve immediately if limit has not been hit.
     * Will error or delay function execution based on operating mode.
     * O(1)
     * @param {function} callback Function to call.
     * @returns {Promise<T>} Promise of callback results.
     */
    add(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function')
                throw new TypeError('Callback is not a function.');
            this._removeOldRequests();
            if (this._finishedQueue.size() >= this._maxItems) {
                if (this._mode === THROTTLED_QUEUE_MODE.ERROR)
                    throw new Error(`Throttle limit reached: ${this._maxItems} per ${this._timeWindow / 1000} seconds.`);
                this.delayedQueue.addBack(callback);
                do {
                    const timeToNext = Math.min(1, this._finishedQueue.peekFront() + this._timeWindow - Date.now());
                    yield sleep(timeToNext);
                    this._removeOldRequests();
                } while (this._finishedQueue.size() >= this._maxItems || this.delayedQueue.peekFront() !== callback);
                this.delayedQueue.removeFront();
            }
            this._finishedQueue.addBack(Date.now());
            return callback();
        });
    }
    /**
     * If operating in delay mode, returns the number of function calls that have been delayed by the throttle. O(1)
     * @returns {number}
     */
    getDelayedSize() {
        return this.delayedQueue.size();
    }
    /**
     * Get number of function calls available before hitting throttle. O(1)
     * @returns {number}
     */
    getRemainingSize() {
        this._removeOldRequests();
        return this._maxItems - this._finishedQueue.size();
    }
    /**
     * Utility function to clean up processed requests that have exceeded current time window. O(n)
     */
    _removeOldRequests() {
        const startTimeframe = Date.now() - this._timeWindow;
        while (this._finishedQueue.peekFront() !== null && this._finishedQueue.peekFront() < startTimeframe) {
            this._finishedQueue.removeFront();
        }
    }
}
