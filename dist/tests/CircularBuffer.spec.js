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
import { CircularBuffer, enums } from '../index.js';
describe('Test Circular Buffer in Error mode', () => {
    it('Initial circular buffer should be empty and fail on attempted read.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        ok(cb.maxSize() === 5);
        ok(cb.amountFilled() === 0);
        ok(cb.isBufferEmpty());
        ok(!cb.isBufferFull());
        try {
            cb.read();
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
    it('Write one item should update values accordingly.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        cb.write(1);
        ok(cb.amountFilled() === 1);
        ok(!cb.isBufferEmpty());
        ok(!cb.isBufferFull());
    }));
    it('Write to circular buffer followed by call to clear should empty the buffer.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        cb.write(1);
        cb.clear();
        ok(cb.amountFilled() === 0);
        ok(cb.isBufferEmpty());
    }));
    it('Write one item followed by read should update values accordingly.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        cb.write(1);
        ok(cb.read() === 1);
        ok(cb.amountFilled() === 0);
        ok(cb.isBufferEmpty());
        ok(!cb.isBufferFull());
    }));
    it('Write five items should fill up buffer.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 5; i++) {
            cb.write(i);
            ok(cb.amountFilled() === i + 1);
        }
        ok(!cb.isBufferEmpty());
        ok(cb.isBufferFull());
    }));
    it('Write five items and peeking should return or error as expected.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        ok(cb.peek() === 0);
        ok(cb.peekAt(4) === 4);
        try {
            cb.peekAt(5);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
    it('Attempt to write six items should cause error.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 6; i++) {
            try {
                cb.write(i);
                if (i === 5)
                    ok(false);
            }
            catch (error) {
                ok(true);
                ok(i === 5);
            }
        }
    }));
    it('Write five items and iterate through them.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 5; i++) {
            try {
                cb.write(i);
            }
            catch (error) {
                ok(false);
            }
        }
        let j = 0;
        for (const value of cb) {
            ok(j === value);
            j++;
        }
    }));
    it('Remove at should corrently remove item at given offset.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        ok(cb.removeAt(0) === 0);
        ok(cb.removeAt(2) === 3);
        ok(cb.removeAt(2) === 4);
        ok(cb.amountFilled() === 2);
    }));
    it('Remove at should error on invalid indexes.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        try {
            cb.removeAt(0);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        try {
            cb.removeAt(-1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            cb.removeAt(5);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            cb.removeAt('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
    it('Write at should corrently shift items at given offset.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        for (let i = 0; i < 3; i++) {
            cb.write(i);
        }
        cb.writeAt(1, 4);
        ok(cb.peekAt(1) === 4);
        cb.writeAt(4, 5);
        ok(cb.peekAt(4) === 5);
        ok(cb.amountFilled() === 5);
        ok(cb.isBufferFull());
    }));
    it('Write at should error on invalid indexes.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.ERROR);
        try {
            cb.writeAt(-1, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            cb.writeAt(5, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            cb.writeAt('a', 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        try {
            cb.writeAt(1, 1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
});
describe('Test Circular Buffer in Overwrite mode', () => {
    it('Attempt to write six items should overwrite first element.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
        for (let i = 0; i < 6; i++) {
            try {
                cb.write(i);
            }
            catch (error) {
                ok(false);
            }
        }
        ok(cb.isBufferFull());
        ok(cb.amountFilled() === 5);
        ok(cb.read() === 1);
    }));
    it('Write at in middle of full buffer should error.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        try {
            cb.writeAt(2, 9);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    }));
    it('Write at at end of full buffer should overwrite oldest entry.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
        for (let i = 0; i < 5; i++) {
            cb.write(i);
        }
        cb.writeAt(5, 8);
        ok(cb.peekAt(4) === 8);
        ok(cb.isBufferFull());
        ok(cb.amountFilled() === 5);
        ok(cb.read() === 1);
    }));
    it('Find index with primitive should return correct index.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
        for (let i = 0; i < 6; i++) {
            cb.write(i);
        }
        ok(cb.findIndex(3) === 2);
    }));
    it('Find index with callback function should return correct index.', () => __awaiter(void 0, void 0, void 0, function* () {
        const cb = new CircularBuffer(5, enums.CIRCULAR_BUFFER_MODE.OVERWRITE);
        for (let i = 0; i < 6; i++) {
            cb.write({ foo: i });
        }
        ok(cb.findIndex(node => node.foo === 3) === 2);
    }));
});
