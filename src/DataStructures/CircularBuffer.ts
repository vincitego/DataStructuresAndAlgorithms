export enum CIRCULAR_BUFFER_MODE {
	OVERWRITE = 0,
	ERROR = 1,
}


export class CircularBuffer<T> implements Iterable<T> {
  private _size: number;
  private _mode: CIRCULAR_BUFFER_MODE;
	private _buffer: T[];
	private _prereadIndex: number;
	private _writeIndex: number;


  /**
   * Creates a Circular Buffer.
	 * @param {number} size Maximum number of nodes in buffer.
	 * @param {CIRCULAR_BUFFER_MODE} mode Whether to throw error or overwrite old data when buffer is full.
   */
  constructor(size: number, mode: CIRCULAR_BUFFER_MODE = CIRCULAR_BUFFER_MODE.ERROR) {
		if (typeof size !== 'number') throw new TypeError('Size must be a number.');
		if (size < 1) throw new RangeError('Size must be greater than 0.');
		if (mode !== CIRCULAR_BUFFER_MODE.OVERWRITE && mode !== CIRCULAR_BUFFER_MODE.ERROR) throw new TypeError('Invalid circular buffer mode specified');

    this._size = size;
		this._mode = mode;
		this._buffer = new Array(size + 1);
		this._prereadIndex = 0;
		this._writeIndex = 1;
  }


  /**
   * Get size of buffer.
   * @returns {number}
   */
  size(): number {
    return this._size;
  }


  /**
   * Get oldest unread data in buffer.
   * @returns {T}
   */
  read(): T {
    if (this.isBufferEmpty()) throw new RangeError('Read failed, buffer is empty.');
    this._prereadIndex = this._incrementIndex(this._prereadIndex);
    return this._buffer[this._prereadIndex];
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
      return this._size - this._prereadIndex + this._writeIndex;
    }
  }


  /**
   * Utility function to calculate incremented index value without overflowing.
   * @param {number} index Index value to increment.
   * @returns {number}
   */
  private _incrementIndex(index: number): number {
    return (index + 1) % (this._size + 1);
  }


  /**
   * Iterator to allow looping. Reads until buffer is empty.
   */
  *[Symbol.iterator](): Iterator<T> {
    while (!this.isBufferEmpty()) {
      yield this.read();
    }
  }
}