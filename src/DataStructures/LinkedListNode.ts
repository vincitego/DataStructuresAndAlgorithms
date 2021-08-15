export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | undefined;


  /**
   * Creates a new node for a Linked List.
   * @param value Value of node.
   */
  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}