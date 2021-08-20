export enum CIRCULAR_BUFFER_MODE {
	OVERWRITE = 0,
	ERROR = 1,
}


export class CircularBuffer<T> implements Iterable<T> {
  private _maxSize: number;
  private _mode: CIRCULAR_BUFFER_MODE;
	private _buffer: T[];
	private _prereadIndex: number;
	private _writeIndex: number;


  /**
   * Creates a Circular Buffer.
	 * @param {number} maxSize Maximum number of nodes in buffer.
	 * @param {CIRCULAR_BUFFER_MODE} mode Whether to throw error or overwrite old data when buffer is full.
   */
  constructor(maxSize: number, mode: CIRCULAR_BUFFER_MODE = CIRCULAR_BUFFER_MODE.ERROR) {
		if (typeof maxSize !== 'number') throw new TypeError('Size must be a number.');
		if (maxSize < 1) throw new RangeError('Size must be greater than 0.');
		if (mode !== CIRCULAR_BUFFER_MODE.OVERWRITE && mode !== CIRCULAR_BUFFER_MODE.ERROR) throw new TypeError('Invalid circular buffer mode specified');

    this._maxSize = maxSize;
		this._mode = mode;
		this._buffer = new Array(maxSize + 1);
		this._prereadIndex = 0;
		this._writeIndex = 1;
  }


  /**
   * Get oldest unread data in buffer and remove it.
   * @returns {T}
   */
  read(): T {
    if (this.isBufferEmpty()) throw new RangeError('Read failed, buffer is empty.');
    this._prereadIndex = this._incrementIndex(this._prereadIndex);
    return this._buffer[this._prereadIndex];
  }


  /**
   * Remove and return value at given offset from current read position.
   * @param {number} offset 
   * @returns {T}
   */
  removeAt(offset: number): T {
    if (typeof offset !== 'number') throw new TypeError('Offset needs to be a number.');
    if (this.isBufferEmpty()) throw new RangeError('Buffer is empty.');
    if (offset === 0) return this.read();

    const currentAmountFilled = this.amountFilled();
    if (offset < 0 || offset >= currentAmountFilled) throw new RangeError('Offset out of range.');

    let deleteIndex = (this._prereadIndex + 1 + offset) % (this._maxSize + 1);
    const timesToShift = currentAmountFilled - offset - 1;
    const value = this._buffer[deleteIndex];

    for (let i = 0; i < timesToShift; i++) {
      const nextIndex = this._incrementIndex(deleteIndex);
      this._buffer[deleteIndex] = this._buffer[nextIndex];
      deleteIndex = nextIndex;
    }

    this._writeIndex = this._decrementIndex(this._writeIndex);
    return value;
  }


  /**
   * Get oldest unread data in buffer without removing it.
   * @returns {T}
   */
  peek(): T {
    if (this.isBufferEmpty()) throw new RangeError('Peek failed, buffer is empty.');
    return this._buffer[this._incrementIndex(this._prereadIndex)];
  }


  /**
   * Get unread data at given index in buffer without removing it.
   * @param {number} offset Offset from current read location to peek at.
   * @returns {T}
   */
  peekAt(offset: number): T {
    if (typeof offset !== 'number') throw new TypeError('Index needs to be a number.');
    if (this.isBufferEmpty()) throw new RangeError('Peek failed, buffer is empty.');
    if (offset < 0 || offset >= this.amountFilled()) throw new RangeError('Index out of range');
    
    const peekIndex = (this._prereadIndex + 1 + offset) % (this._maxSize + 1);
    return this._buffer[peekIndex];
  }


  /**
   * Write data to the buffer.
   * @param {T} value Value to write.
   * @returns {CircularBuffer<T>} Returns self.
   */
  write(value: T): CircularBuffer<T> {
    if (this.isBufferFull()) {
      if (this._mode === CIRCULAR_BUFFER_MODE.ERROR) throw new RangeError('Write failed, buffer is full.');
      if (this._mode === CIRCULAR_BUFFER_MODE.OVERWRITE) this._prereadIndex = this._incrementIndex(this._prereadIndex);
    }

    this._buffer[this._writeIndex] = value;
    this._writeIndex = this._incrementIndex(this._writeIndex);
    return this;
  }


  /**
   * Writes data at given offset from current read location, shifting data forward.
   * @param {number} offset Offset from current read location to write at.
   * @param {T} value Value to write
   * @returns {CircularBuffer<T>} Returns self.
   */
  writeAt(offset: number, value: T): CircularBuffer<T> {
    if (typeof offset !== 'number') throw new TypeError('Offset needs to be a number.');
    if (this.isBufferFull() && this._mode === CIRCULAR_BUFFER_MODE.ERROR) throw new RangeError('Buffer is full.');

    const currentAmountFilled = this.amountFilled();
    if (offset < 0 || offset > currentAmountFilled) throw new RangeError('Index out of range.');
    if (currentAmountFilled === offset) return this.write(value);

    let shiftIndex = this._writeIndex;
    const timesToShift = currentAmountFilled - offset;

    for (let i = 0; i < timesToShift; i++) {
      const nextIndex = this._decrementIndex(shiftIndex);
      this._buffer[shiftIndex] = this._buffer[nextIndex];
      shiftIndex = nextIndex;
    }

    let insertIndex = (this._prereadIndex + 1 + offset) % (this._maxSize + 1);
    this._buffer[insertIndex] = value;
    this._writeIndex = this._incrementIndex(this._writeIndex);
    return this;
  }


  /**
   * Get size of buffer.
   * @returns {number}
   */
  maxSize(): number {
    return this._maxSize;
  }


  /**
   * Checks whether all data written so far has already been read.
   * @returns {boolean}
   */
  isBufferEmpty(): boolean {
    return this._incrementIndex(this._prereadIndex) === this._writeIndex;
  }


  /**
   * Checks whether buffer has been filled with written data that has not been read yet.
   * @returns {boolean}
   */
  isBufferFull(): boolean {
    return this._writeIndex === this._prereadIndex;
  }


  /**
   * Get amount of items in buffer that have not been read yet.
   * @returns {number}
   */
  amountFilled(): number {
    if (this._prereadIndex < this._writeIndex) {
      return this._writeIndex - this._prereadIndex - 1;
    } else {
      return this._maxSize - this._prereadIndex + this._writeIndex;
    }
  }


  /**
   * Clears the buffer.
   * @returns {CircularBuffer<T>} Returns self.
   */
  clear(): CircularBuffer<T> {
    this._prereadIndex = 0;
    this._writeIndex = 1;
    return this;
  }


  /**
   * Find index of first value matching given value or where given callback evaluates to true.
   * @param {} valueOrCallback 
   * @returns {number}
   */
	findIndex(valueOrCallback: T | ((node: T) => boolean)): number {
    if (this.isBufferEmpty()) return -1;

    let index = 0;

    for (const node of this) {
      if (typeof valueOrCallback === 'function' && (valueOrCallback as (node: T) => boolean)(node)) {
        return index;
      } else if (valueOrCallback === node) {
        return index;
      }
      
      index++;
    }

    return -1;
	}


  /**
   * Utility function to calculate incremented index value without overflowing.
   * @param {number} index Index value to increment.
   * @returns {number}
   */
  private _incrementIndex(index: number): number {
    return (index + 1) % (this._maxSize + 1);
  }


  /**
   * Utility function to calculate decremented index value without underflowing.
   * @param {number} index Index value to decrement.
   * @returns {number}
   */
  private _decrementIndex(index: number): number {
    return index === 0 ? this._maxSize : index - 1;
  }


  /**
   * Iterator to allow looping.
   */
  *[Symbol.iterator](): Iterator<T> {
    const amountFilled = this.amountFilled();

    for (let i = 1; i <= amountFilled; i++) {
      yield this._buffer[(this._prereadIndex + i) % (this._maxSize + 1)];
    }
  }
}