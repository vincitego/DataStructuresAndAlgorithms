import { LinkedListNode } from './LinkedListNode.js';


export class LinkedList<T> implements Iterable<T> {
  private _head: LinkedListNode<T> | undefined;
  private _tail: LinkedListNode<T> | undefined;
  private _size: number;


  /**
   * Creates a Linked List
   */
  constructor() {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }


  /**
   * Creates a Linked List from and iterable of elements.
   * Can be used as a Queue. For a Stack, use an Array.
   * @param iterable Iterable to populate elements from.
   */
  static from<T>(iterable: T[]): LinkedList<T> {
    const newLinkedList = new LinkedList<T>();

    for (const element of iterable) {
      newLinkedList.addBack(element);
    }

    return newLinkedList;
  }


  /**
   * Returns size of list.
   */
  size(): number {
    return this._size;
  }


  /**
   * Add new node to end of Linked List
   * @param val Value of new node
   */
  addBack(val: T): LinkedList<T> {
    const newNode = new LinkedListNode(val);

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
   * Get value at front of Linked List without removing the node.
   */
  peekFront(): T | undefined {
    return this._head?.val;
  }


  /**
   * Get value at front of Linked List and remove the node.
   */
  removeFront(): T | undefined {
    if (this._size === 0) return undefined;

    const val = this._head!.val;
    this._head = this._head!.next;
    this._size--;
    return val;
  }


  /**
   * Clears all nodes from Linked List.
   */
  clear(): LinkedList<T> {
    this._head = undefined;
    this._size = 0;
    return this;
  }


  /**
   * Iterator to allow looping.
   */
  *[Symbol.iterator](): Iterator<T> {
    if (this._size === 0) return;

    for (let curr = this._head; curr !== undefined; curr = curr.next) {
      yield curr.val;
    }
  }
}