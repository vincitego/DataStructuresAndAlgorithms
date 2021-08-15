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
import { ThrottledQueue, THROTTLED_QUEUE_MODE } from '../DataStructures/ThrottledQueue.js';
import { sleep } from '../utility/utility.js';
describe('ThrottledQueue in error mode test 1', () => {
    it('Should error out after putting too many requests into queue', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTQ = new ThrottledQueue(5, 1000, THROTTLED_QUEUE_MODE.ERROR);
        for (let i = 1; i <= 10; i++) {
            try {
                yield newTQ.add(console.info.bind(null, i));
            }
            catch (err) {
                ok(true);
                return;
            }
        }
        ok(false);
    }));
});
describe('ThrottledQueue in error mode test 2', () => {
    it('Should not error out after putting too many requests into queue due to inserted sleep', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTQ = new ThrottledQueue(5, 1000, THROTTLED_QUEUE_MODE.ERROR);
        for (let i = 1; i <= 5; i++) {
            try {
                yield newTQ.add(console.info.bind(null, i));
            }
            catch (err) {
                ok(false);
            }
        }
        yield sleep(1000);
        for (let i = 1; i <= 5; i++) {
            try {
                yield newTQ.add(console.info.bind(null, i));
            }
            catch (err) {
                ok(false);
            }
        }
        ok(true);
    }));
});
describe('ThrottledQueue in delay mode', () => {
    it('Should take about a little more than a second to complete', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTQ = new ThrottledQueue(5, 1000, THROTTLED_QUEUE_MODE.DELAY);
        const timeStart = Date.now();
        for (let i = 1; i <= 10; i++) {
            try {
                yield newTQ.add(console.info.bind(null, i));
            }
            catch (err) {
                ok(false);
            }
        }
        ok(Date.now() - timeStart >= 1000);
    }));
});
