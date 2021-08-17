var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ok } from 'assert';
import { ThrottledQueue, enums } from '../index.js';
import { sleep } from '../utility/utility.js';
describe('Test Throttled Queue in Error mode', () => {
    it('Should error out after putting too many requests into queue', () => __awaiter(void 0, void 0, void 0, function* () {
        const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.ERROR);
        for (let i = 1; i <= 10; i++) {
            try {
                ok(i === (yield tq.add(val => val, i)));
                ok(tq.getRemainingSize() === (5 - i));
            }
            catch (err) {
                ok(true);
                return;
            }
        }
        ok(false);
    }));
    it('Should not error out after putting too many requests into queue due to manually inserted sleep', () => __awaiter(void 0, void 0, void 0, function* () {
        const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.ERROR);
        for (let i = 1; i <= 5; i++) {
            try {
                ok(i === (yield tq.add(val => val, i)));
                ok(tq.getRemainingSize() === (5 - i));
            }
            catch (err) {
                ok(false);
            }
        }
        yield sleep(1000);
        for (let i = 1; i <= 5; i++) {
            try {
                ok(i === (yield tq.add(val => val, i)));
                ok(tq.getRemainingSize() !== 5);
            }
            catch (err) {
                ok(false);
            }
        }
        ok(true);
    }));
});
describe('Test Throttled Queue in Delay mode', () => {
    it('Should take about a little more than a second to complete', () => __awaiter(void 0, void 0, void 0, function* () {
        const tq = new ThrottledQueue(5, 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
        const shouldBeDelayedPromises = [];
        const timeStart = performance.now();
        for (let i = 1; i <= 5; i++) {
            try {
                ok(i === (yield tq.add(val => val, i)));
                ok(tq.getRemainingSize() === (5 - i));
            }
            catch (err) {
                ok(false);
            }
        }
        for (let i = 1; i <= 5; i++) {
            try {
                shouldBeDelayedPromises.push(tq.add(val => val, i));
                ok(tq.getDelayedSize() === i);
                ok(tq.getRemainingSize() === 0);
            }
            catch (err) {
                ok(false);
            }
        }
        yield Promise.all(shouldBeDelayedPromises);
        ok(performance.now() - timeStart >= 1000);
    }));
    it('Should error out when trying to create invalid throttled queues', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tq = new ThrottledQueue(0, 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const tq = new ThrottledQueue(5, 0, enums.THROTTLED_QUEUE_MODE.DELAY);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const tq = new ThrottledQueue('a', 1000, enums.THROTTLED_QUEUE_MODE.DELAY);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const tq = new ThrottledQueue(5, 'a', enums.THROTTLED_QUEUE_MODE.DELAY);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            const tq = new ThrottledQueue(5, 1000, 3);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
});
