export class LinkedListNode<T> {
  val: T;
  next: LinkedListNode<T> | undefined;


  /**
   * Creates a new node for a Linked List.
   * @param val Value of node.
   */
  constructor(val: T) {
    this.val = val;
    this.next = undefined;
  }
}