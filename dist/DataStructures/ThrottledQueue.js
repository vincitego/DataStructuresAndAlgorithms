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
    THROTTLED_QUEUE_MODE["DELAY"] = "delay";
    THROTTLED_QUEUE_MODE["ERROR"] = "error";
})(THROTTLED_QUEUE_MODE || (THROTTLED_QUEUE_MODE = {}));
export class ThrottledQueue {
    constructor(maxRequests, perMsTimeframe, opMode = THROTTLED_QUEUE_MODE.DELAY) {
        if (maxRequests <= 0)
            throw new Error('Max requests must be a positive integer');
        if (perMsTimeframe <= 0)
            throw new Error('Timeframe in milliseconds must be a positive integer');
        this._maxRequests = maxRequests;
        this._perMsTimeframe = perMsTimeframe;
        this._opMode = opMode;
        this._finishedQueue = new LinkedList();
        this._delayedSize = 0;
    }
    add(funcToCall) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.size() >= this._maxRequests) {
                if (this._opMode === THROTTLED_QUEUE_MODE.ERROR) {
                    const errMessage = `Throttle limit reached: ${this._maxRequests} per ${this._perMsTimeframe / 1000} seconds.`;
                    throw new Error(errMessage);
                }
                else {
                    this._delayedSize++;
                    do {
                        let timeToNext = this._finishedQueue.peekFront() + this._perMsTimeframe + this._delayedSize - Date.now();
                        if (timeToNext <= 0)
                            timeToNext = 1;
                        yield sleep(timeToNext);
                    } while (this.size() >= this._maxRequests);
                    this._delayedSize--;
                    this._finishedQueue.addBack(Date.now());
                    return funcToCall();
                }
            }
            else {
                this._finishedQueue.addBack(Date.now());
                return funcToCall();
            }
        });
    }
    removeOldRequests() {
        const startTimeframe = Date.now() - this._perMsTimeframe;
        while (this._finishedQueue.peekFront() !== null && this._finishedQueue.peekFront() < startTimeframe) {
            this._finishedQueue.removeFront();
        }
    }
    size() {
        this.removeOldRequests();
        return this._finishedQueue.size();
    }
    delayedSize() {
        return this._delayedSize;
    }
}
