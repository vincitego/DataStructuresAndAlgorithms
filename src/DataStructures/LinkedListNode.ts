export class LinkedListNode<T> {
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