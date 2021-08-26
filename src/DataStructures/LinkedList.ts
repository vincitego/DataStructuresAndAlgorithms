/**
 * Linked List Node class to contain the data in a node.
 */
class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T> | undefined;


  /**
   * Creates a new node for a Linked List.
   * @param value Value of node.
   */
  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}


/**
 * Singly Linked List implementation that can also be used as a queue.
 */
export class LinkedList<T> implements Iterable<T> {
  private _head: LinkedListNode<T> | undefined;
  private _tail: LinkedListNode<T> | undefined;
  private _size: number;


  /**
   * Creates a new Linked List.
   * Can be used as a Queue. For a Stack, use an Array.
   */
  constructor() {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }


  /**
   * Add new node to beginning of Linked List. O(1)
   * @param {T} value Value of new node.
   * @returns {LinkedList<T>} Returns self.
   */
  addFront(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value);

    if (this._size === 0) {
      this._tail = newNode;
    } else {
      newNode.next = this._head;
    }

    this._head = newNode;
    this._size++;

    return this;
  }


  /**
   * Add new node to end of Linked List. O(1)
   * @param {T} value Value of new node.
   * @returns {LinkedList<T>} Returns self.
   */
  addBack(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value);

    if (this._size === 0) {
      this._head = newNode;
    } else {
      this._tail!.next = newNode;
    }

    this._tail = newNode;
    this._size++;

    return this;
  }


  /**
   * Add new node to beginning of Linked List. O(n)
   * @param {number} index Index to add new node at.
   * @param {T} value Value of new node.
   * @returns {LinkedList<T>} Returns self.
   */
  addAt(index: number, value: T): LinkedList<T> {
    if (typeof index !== 'number') throw new TypeError('Index needs to be a number.');
    if (index === 0) return this.addFront(value);
    if (index === this._size) return this.addBack(value);
    if (index > this._size || index < 0) throw new RangeError('Index out of range.');


    const newNode = new LinkedListNode(value);
    let previousNode = this._head;

    for (let i = 1; i < index; i++) {
      previousNode = previousNode!.next;
    }

    newNode.next = previousNode!.next;
    previousNode!.next = newNode;
    this._size++;

    return this;
  }


  /**
   * Get value at front of Linked List without removing the node. O(1)
   * @returns {T | undefined} 
   */
  peekFront(): T | undefined {
    return this._head?.value;
  }


  /**
   * Get value at back of Linked List without removing the node. O(1)
   * @returns {T | undefined} 
   */
  peekBack(): T | undefined {
    return this._tail?.value;
  }


  /**
   * Get value at given index of Linked List without removing the node. O(n)
   * @param {number} index Index of node to peek at.
   * @returns {T | undefined} 
   */
  peekAt(index: number): T | undefined {
    if (typeof index !== 'number') throw new TypeError('Index needs to be a number.');
    if (index >= this._size || index < 0) return undefined;

    let node = this._head!;

    for (let i = 1; i <= index; i++) {
      node = node.next!;
    }

    return node.value;
  }


  /**
   * Get value at front of Linked List and remove the node. O(1)
   * @returns {T | undefined} 
   */
  removeFront(): T | undefined {
    if (this._size === 0) return undefined;

    const value = this._head!.value;
    this._head = this._head!.next;
    this._size--;

    if (this._size === 0) this._tail = undefined;

    return value;
  }


  /**
   * Get value at back of Linked List and remove the node. O(n)
   * @returns {T | undefined} 
   */
  removeBack(): T | undefined {
    if (this._size === 0) return undefined;
    return this.removeAt(this._size - 1);
  }


  /**
   * Remove node at given index of Linked List. O(n)
   * @param {number} index Index of node to remove.
   * @returns {T | undefined} 
   */
  removeAt(index: number): T {
    if (typeof index !== 'number') throw new TypeError('Index needs to be a number.');
    if (index === 0) return this.removeFront()!;
    if (index >= this._size || index < 0) throw new RangeError('Index out of range.');

    let previousNode = this._head!;
    let currentNode = this._head!;

    for (let i = 1; i <= index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next!;
    }

    previousNode.next = currentNode.next;
    if (currentNode === this._tail) this._tail = previousNode;

    this._size--;
    return currentNode.value;
  }


  /**
   * Returns size of linked list. O(1)
   * @returns {number}
   */
  size(): number {
    return this._size;
  }


  /**
   * Clears all nodes from Linked List. O(1)
   * @returns {LinkedList<T>} Returns self.
   */
  clear(): LinkedList<T> {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
    return this;
  }


  /**
   * Find index of first value matching given value or where given callback evaluates to true. O(n)
   * @param {} valueOrCallback 
   * @returns {number}
   */
	findIndex(valueOrCallback: T | ((node: T) => boolean)): number {
    if (this._size === 0) return -1;

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
   * Iterator to allow looping.
   */
  *[Symbol.iterator](): Iterator<T> {
    if (this._size === 0) return;

    for (let curr = this._head; curr !== undefined; curr = curr.next) {
      yield curr.value;
    }
  }
}