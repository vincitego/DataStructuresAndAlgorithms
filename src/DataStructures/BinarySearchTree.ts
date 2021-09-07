import { defaultMinCompare } from "../utility/utility.js";
import { LinkedList } from '../index.js';


/**
 * Binary Search Tree Node class to contain the data in a node.
 */
 class BinarySearchTreeNode<T> {
  public value: T;
  public left: BinarySearchTreeNode<T> | undefined;
  public right: BinarySearchTreeNode<T> | undefined;
	public height: number;


  /**
   * Creates a new node for a Binary Search Tree.
   * @param value Value of node.
   */
  constructor(value: T) {
    this.value = value;
		this.height = 0;
  }
}


/**
 * Binary Search Tree implementation.
 * Balanced using AVL rotations.
 */
export class BinarySearchTree<T> {
  private _root: BinarySearchTreeNode<T> | undefined;
  private _size: number;
	private _comparisonFunction: (a: T, b: T) => number;


  /**
   * Creates a new Binary Search Tree.
	 * @param {function} comparisonFunction Function to use to compare node values.
   */
  constructor(comparisonFunction: (a: T, b: T) => number = defaultMinCompare) {
		if (typeof comparisonFunction !== 'function') throw new TypeError('comparisonFunction needs to be a function');

    this._root = undefined;
    this._size = 0;
		this._comparisonFunction = comparisonFunction;
  }


	/**
	 * Adds new node to tree.
	 * If value already exists, replaces the value at the node.
	 * @param {T} value 
	 * @returns {this}
	 */
	add(value: T): this {
		const newNode = new BinarySearchTreeNode<T>(value);

		if (this._size === 0) {
			this._root = newNode;
			this._size = 1;

		} else {
			const nodesTraversed: [BinarySearchTreeNode<T>, boolean][] = [];
			let currentNode = this._root!;

			while (true) {
				const comparison = this._comparisonFunction(value, currentNode.value);
				
				if (comparison === 0) {
					currentNode.value = value;
					break;

				} else if (comparison < 0 && currentNode.left === undefined) {
					currentNode.left = newNode;
					nodesTraversed.push([currentNode, true]);
					this._size++;
					break;

				} else if (comparison < 0 && currentNode.left !== undefined) {
					nodesTraversed.push([currentNode, true]);
					currentNode = currentNode.left;

				} else if (comparison > 0 && currentNode.right === undefined) {
					currentNode.right = newNode;
					nodesTraversed.push([currentNode, false]);
					this._size++;
					break;

				} else if (comparison > 0 && currentNode.right !== undefined) {
					nodesTraversed.push([currentNode, false]);
					currentNode = currentNode.right;
				}
			}


			for (let i = nodesTraversed.length - 1; i > 0; i--) {
				this._updateHeight(nodesTraversed[i][0]);
				this._balance(nodesTraversed[i][0], nodesTraversed[i - 1][0], nodesTraversed[i - 1][1]);
			}

			if (nodesTraversed.length > 0) {
				this._updateHeight(nodesTraversed[0][0]);
				this._balance(nodesTraversed[0][0]);
			}
		}

		return this;
	}


	/**
	 * Removes a node matching given value using the comparison function given at initialization.
	 * @param {T} value 
	 * @returns {T | undefined}
	 */
	remove(value: T): T | undefined {
		let currentNode = this._root;
		let currentValue = this._root?.value;
		let parentNode = this._root;
		let wentLeft = false;

		while (currentNode !== undefined) {
			const comparison = this._comparisonFunction(value, currentNode.value);

			if (comparison === 0) {
				if (this._size === 1) {
					this._root = undefined;

				} else if (currentNode.left === undefined && currentNode.right === undefined) {
					if (wentLeft) {
						parentNode!.left = undefined;
					} else {
						parentNode!.right = undefined;
					}

				} else if (currentNode.left !== undefined && currentNode.right === undefined) {
					const leftNode = currentNode.left;
					currentNode.value = leftNode.value;
					currentNode.left = leftNode.left;
					currentNode.right = leftNode.right;

				} else if (currentNode.left === undefined && currentNode.right !== undefined) {
					const rightNode = currentNode.right;
					currentNode.value = rightNode.value;
					currentNode.left = rightNode.left;
					currentNode.right = rightNode.right;

				} else {
					let replacementNode = currentNode.right!;
					let replacementParent = currentNode;
					let replaceLeft = false;

					while (replacementNode.left !== undefined) {
						replacementParent = replacementNode;
						replacementNode = replacementNode.left;
						replaceLeft = true;
					}

					currentNode.value = replacementNode.value;

					if (replaceLeft) {
						replacementParent.left = replacementNode.right;
					} else {
						replacementParent.right = replacementNode.right;
					}
				}

				this._size--;
				break;

			} else if (comparison < 0) {
				parentNode = currentNode;
				currentNode = currentNode.left;
				currentValue = currentNode?.value;
				wentLeft = true;

			} else if (comparison > 0) {
				parentNode = currentNode;
				currentNode = currentNode.right;
				currentValue = currentNode?.value;
				wentLeft = false;

			} else {
				currentNode = undefined;
				currentValue = undefined;
			}
		}

		return currentValue;
	}


	/**
	 * Finds a value in the tree using the comparison function at instantiation
	 * @param {T} value Value to find
	 * @returns {T | undefined}
	 */
	find(value: T): T | undefined {
		let currentNode = this._root;

		while (currentNode !== undefined) {
			const comparison = this._comparisonFunction(value, currentNode.value);

			if (comparison === 0) {
				break;
			} else if (comparison < 0) {
				currentNode = currentNode.left;
			} else if (comparison > 0) {
				currentNode = currentNode.right;
			} else {
				currentNode = undefined;
			}
		}

		return currentNode?.value;
	}


	/**
	 * Get size of tree.
	 * @returns {number}
	 */
	size(): number {
		return this._size;
	}


	/**
	 * Removes all nodes from tree.
	 * @returns {this}
	 */
	clear(): this {
		this._size = 0;
		this._root = undefined;
		return this;
	}


	/**
	 * Iterates tree in pre-order.
	 * @returns {Generator<T>}
	 */
  * preOrderTraversal(): Generator<T> {
    if (this._size === 0) return;

		const stack = [this._root!];

		while (stack.length > 0) {
			const node = stack.pop()!;
			yield node.value;

			if (node.right !== undefined) stack.push(node.right);
			if (node.left !== undefined) stack.push(node.left);
		}
  }


	/**
	 * Iterates tree in order.
	 * @returns {Generator<T>}
	 */
  * inOrderTraversal(): Generator<T> {
		if (this._size === 0) return;

		const stack = [[this._root, undefined]];
		if (this._root!.right !== undefined) stack.unshift([this._root, this._root!.right]);
		if (this._root!.left !== undefined) stack.push([this._root, this._root!.left]);

		while (stack.length > 0) {
			const [node, next] = stack.pop()!;
			
			if (next === undefined) {
				yield node!.value;
			} else {
				if (next.right !== undefined) stack.push([next, next.right]);
				stack.push([next, undefined]);
				if (next.left !== undefined) stack.push([next, next.left]);
			}
		}
  }


	/**
	 * Iterates tree in post-order.
	 * @returns {Generator<T>}
	 */
  * postOrderTraversal(): Generator<T> {
    if (this._size === 0) return;

		const stack = [[this._root, undefined]];
		if (this._root!.right !== undefined) stack.push([this._root, this._root!.right]);
		if (this._root!.left !== undefined) stack.push([this._root, this._root!.left]);

		while (stack.length > 0) {
			const [node, next] = stack.pop()!;
			
			if (next === undefined) {
				yield node!.value;
			} else {
				stack.push([next, undefined]);
				if (next.right !== undefined) stack.push([next, next.right]);
				if (next.left !== undefined) stack.push([next, next.left]);
			}
		}
  }


	/**
	 * Iterates tree in level order.
	 * @returns {Generator<T>}
	 */
  * levelOrderTraversal(): Generator<T> {
    if (this._size === 0) return;

		const queue = new LinkedList<BinarySearchTreeNode<T>>();
		queue.addBack(this._root!);

    while(queue.size() > 0) {
			const node = queue.removeFront()!;
			if (node.left !== undefined) queue.addBack(node.left);
			if (node.right !== undefined) queue.addBack(node.right);
			yield node.value;
		}
  }


	/**
	 * Utility function to rotate nodes to the right.
	 * @param {BinarySearchTreeNode<T>} node Node to rotate to the right
	 * @param {BinarySearchTreeNode<T>} parent Parent of node
	 * @param {boolean} isLeft Indicates whether node is left or right child of parent
	 * @returns {BinarySearchTreeNode<T>} The original left child of node
	 */
	private _rotateRight(node: BinarySearchTreeNode<T>, parent?: BinarySearchTreeNode<T>, isLeft?: boolean): BinarySearchTreeNode<T> {
		const childNode = node.left!;
		node.left = childNode.right;
		childNode.right = node;

		if (parent) {
			if (isLeft) {
				parent.left = childNode;
			} else {
				parent.right = childNode;
			}
		}

		return childNode;
	}


	/**
	 * Utility function to rotate nodes to the left.
	 * @param {BinarySearchTreeNode<T>} node Node to rotate to the left
	 * @param {BinarySearchTreeNode<T>} parent Parent of node
	 * @param {boolean} isLeft Indicates whether node is left or right child of parent
	 * @returns {BinarySearchTreeNode<T>} The original right child of node
	 */
	private _rotateLeft(node: BinarySearchTreeNode<T>, parent?: BinarySearchTreeNode<T>, isLeft?: boolean): BinarySearchTreeNode<T> {
		const childNode = node.right!;
		node.right = childNode.left;
		childNode.left = node;

		if (parent) {
			if (isLeft) {
				parent.left = childNode;
			} else {
				parent.right = childNode;
			}
		}

		return childNode;
	}


	/**
	 * Updates the height of the nodes beneath a given node
	 * @param {BinarySearchTreeNode<T>} node Node to update height of
	 */
	private _updateHeight(node: BinarySearchTreeNode<T>): void {
		const heightLeft = node?.left?.height ?? -1;
		const heightRight = node?.right?.height ?? -1;
		node.height = 1 + Math.max(heightLeft, heightRight);
	}


	/**
	 * Utility function to calculate the balance factor of a given node
	 * @param {BinarySearchTreeNode<T>} node Node to use in calculation
	 * @returns {number}
	 */
	private _calcBalanceFactor(node?: BinarySearchTreeNode<T>): number {
		const heightLeft = node?.left?.height ?? -1;
		const heightRight = node?.right?.height ?? -1;
		return heightRight - heightLeft;
	}


	/**
	 * Utility function to balance tree using rotations
	 * @param {BinarySearchTreeNode<T>} node Node to rotate to the left
	 * @param {BinarySearchTreeNode<T>} parent Parent of node
	 * @param {boolean} isLeft Indicates whether node is left or right child of parent
	 */
	private _balance(node: BinarySearchTreeNode<T>, parent?: BinarySearchTreeNode<T>, isLeft?: boolean): void {
		const balanceFactor = this._calcBalanceFactor(node);

		if (balanceFactor < -1) {
			const childBalanceFactor = this._calcBalanceFactor(node.left);
			if (childBalanceFactor > 0) {
				this._rotateLeft(node.left!, node, true);
			}
			const rotateResult = this._rotateRight(node, parent, isLeft);
			if (node === this._root) this._root = rotateResult;

		} else if (balanceFactor > 1) {
			const childBalanceFactor = this._calcBalanceFactor(node.right);
			if (childBalanceFactor < 0) {
				this._rotateRight(node.right!, node, false);
			}
			const rotateResult = this._rotateLeft(node, parent, isLeft);
			if (node === this._root) this._root = rotateResult;
		}
	}
}