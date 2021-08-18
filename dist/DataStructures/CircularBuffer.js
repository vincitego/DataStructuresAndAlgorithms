export var CIRCULAR_BUFFER_MODE;
(function (CIRCULAR_BUFFER_MODE) {
    CIRCULAR_BUFFER_MODE[CIRCULAR_BUFFER_MODE["OVERWRITE"] = 0] = "OVERWRITE";
    CIRCULAR_BUFFER_MODE[CIRCULAR_BUFFER_MODE["ERROR"] = 1] = "ERROR";
})(CIRCULAR_BUFFER_MODE || (CIRCULAR_BUFFER_MODE = {}));
export class CircularBuffer {
    /**
     * Creates a Circular Buffer.
       * @param {number} maxSize Maximum number of nodes in buffer.
       * @param {CIRCULAR_BUFFER_MODE} mode Whether to throw error or overwrite old data when buffer is full.
     */
    constructor(maxSize, mode = CIRCULAR_BUFFER_MODE.ERROR) {
        if (typeof maxSize !== 'number')
            throw new TypeError('Size must be a number.');
        if (maxSize < 1)
            throw new RangeError('Size must be greater than 0.');
        if (mode !== CIRCULAR_BUFFER_MODE.OVERWRITE && mode !== CIRCULAR_BUFFER_MODE.ERROR)
            throw new TypeError('Invalid circular buffer mode specified');
        this._maxSize = maxSize;
        this._mode = mode;
        this._buffer = new Array(maxSize + 1);
        this._prereadIndex = 0;
        this._writeIndex = 1;
    }
    /**
     * Get size of buffer.
     * @returns {number}
     */
    maxSize() {
        return this._maxSize;
    }
    /**
     * Get oldest unread data in buffer and remove it.
     * @returns {T}
     */
    read() {
        if (this.isBufferEmpty())
            throw new RangeError('Read failed, buffer is empty.');
        this._prereadIndex = this._incrementIndex(this._prereadIndex);
        return this._buffer[this._prereadIndex];
    }
    removeAt(index) {
    }
    /**
     * Get oldest unread data in buffer without removing it.
     * @returns {T}
     */
    peek() {
        if (this.isBufferEmpty())
            throw new RangeError('Peek failed, buffer is empty.');
        return this._buffer[this._incrementIndex(this._prereadIndex)];
    }
    /**
     * Get unread data at given index in buffer without removing it.
     * @param {number} index Index offset from current location to peek at.
     * @returns {T}
     */
    peekAt(index) {
        if (this.isBufferEmpty())
            throw new RangeError('Peek failed, buffer is empty.');
        if (index < 0 || index >= this.amountFilled())
            throw new RangeError('Index out of range');
        return this._buffer[this._prereadIndex + 1 + index];
    }
    /**
     * Write data to the buffer.
     * @param {T} value Value to write.
     * @returns {CircularBuffer<T>} Returns self.
     */
    write(value) {
        if (this.isBufferFull()) {
            if (this._mode === CIRCULAR_BUFFER_MODE.ERROR)
                throw new RangeError('Write failed, buffer is full.');
            if (this._mode === CIRCULAR_BUFFER_MODE.OVERWRITE)
                this._prereadIndex = this._incrementIndex(this._prereadIndex);
        }
        this._buffer[this._writeIndex] = value;
        this._writeIndex = this._incrementIndex(this._writeIndex);
        return this;
    }
    writeAt(index, value) {
    }
    /**
     * Checks whether all data written so far has already been read.
     * @returns {boolean}
     */
    isBufferEmpty() {
        return this._incrementIndex(this._prereadIndex) === this._writeIndex;
    }
    /**
     * Checks whether buffer has been filled with written data that has not been read yet.
     * @returns {boolean}
     */
    isBufferFull() {
        return this._writeIndex === this._prereadIndex;
    }
    /**
     * Get amount of items in buffer that have not been read yet.
     * @returns {number}
     */
    amountFilled() {
        if (this._prereadIndex < this._writeIndex) {
            return this._writeIndex - this._prereadIndex - 1;
        }
        else {
            return this._maxSize - this._prereadIndex + this._writeIndex;
        }
    }
    /**
     * Clears the buffer.
     * @returns {CircularBuffer<T>} Returns self.
     */
    clear() {
        this._prereadIndex = 0;
        this._writeIndex = 1;
        return this;
    }
    /**
     * Utility function to calculate incremented index value without overflowing.
     * @param {number} index Index value to increment.
     * @returns {number}
     */
    _incrementIndex(index) {
        return (index + 1) % (this._maxSize + 1);
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        const amountFilled = this.amountFilled();
        for (let i = 1; i <= amountFilled; i++) {
            yield this._buffer[(this._prereadIndex + i) % (this._maxSize + 1)];
        }
    }
}
