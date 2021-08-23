export class DisjointSet {
    /**
     * Creates a new Disjoint Set from a given list of values.
     */
    constructor() {
        this._nodes = [];
        this._values = new Map();
        this._componentSizes = [];
        this._size = 0;
        this._componentCount = 0;
    }
    /**
     * Add new value to set.
     * @param {T} value
     * @returns {DisjointSet<T>} Returns self.
     */
    add(value) {
        this._nodes.push(this._size);
        this._values.set(value, this._size);
        this._componentSizes.push(1);
        this._componentCount++;
        this._size++;
        return this;
    }
    /**
     * Find root node of component.
     * @param {number} index Index of item to find root node of.
     * @returns {number}
     */
    getRoot(index) {
        let parentIndex = index;
        let currentIndex = index;
        while (parentIndex !== this._nodes[parentIndex]) {
            parentIndex = this._nodes[parentIndex];
        }
        while (currentIndex !== parentIndex) {
            const nextIndex = this._nodes[currentIndex];
            this._nodes[currentIndex] = parentIndex;
            currentIndex = nextIndex;
        }
        return parentIndex;
    }
    /**
     * Find root node of component given a value in the set.
     * @param {T} value Value to use to find root node of.
     * @returns {number}
     */
    getRootByValue(value) {
        const index = this.findIndex(value);
        if (index === undefined)
            throw new Error('Value not found in set.');
        return this.getRoot(index);
    }
    /**
     * Attempts to union two nodes together by index.
     * @param {number} index1 Index of first node to union.
     * @param {number} index2 Index of second node to union.
     * @returns {boolean} Indicates whether the union was successful.
     */
    union(index1, index2) {
        if (typeof index1 !== 'number' || typeof index2 !== 'number')
            throw new TypeError('Index need to be number.');
        if (index1 === index2)
            throw new SyntaxError('Indexes should not be the same');
        if (index1 < 0 || index1 >= this.size() || index2 < 0 || index2 >= this.size())
            throw new RangeError('Index out of range.');
        const root1 = this.getRoot(index1);
        const root2 = this.getRoot(index2);
        if (root1 === root2)
            return false;
        this._componentCount--;
        if (root2 === index2) {
            this._nodes[root2] = root1;
            this._componentSizes[root1]++;
            this._componentSizes[root2] = 0;
        }
        else if (root1 === index1) {
            this._nodes[root1] = root2;
            this._componentSizes[root2]++;
            this._componentSizes[root1] = 0;
        }
        else if (this._componentSizes[root1] >= this._componentSizes[root2]) {
            this._nodes[root2] = root1;
            this._componentSizes[root1] += this._componentSizes[root2];
            this._componentSizes[root2] = 0;
        }
        else if (this._componentSizes[root1] < this._componentSizes[root2]) {
            this._nodes[root1] = root2;
            this._componentSizes[root2] += this._componentSizes[root1];
            this._componentSizes[root1] = 0;
        }
        else {
            throw new Error('Catch all failure. This should not happen.');
        }
        return true;
    }
    /**
     * Attempts to union two nodes together by value.
     * @param {T} value1 Value of first node to union.
     * @param {T} value2 Value of second node to union.
     * @returns {boolean} Indicates whether the union was successful.
     */
    unionByValue(value1, value2) {
        const index1 = this.findIndex(value1);
        const index2 = this.findIndex(value2);
        if (index1 === undefined)
            throw new Error('Value not found in set.');
        if (index2 === undefined)
            throw new Error('Value not found in set.');
        return this.union(index1, index2);
    }
    /**
     * Peek at value at a given index in the set.
     * @param index Index to peek at.
     * @returns {T}
     */
    peek(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index needs to be a number.');
        if (index < 0 || index >= this._size)
            throw new RangeError('Index out of range.');
        let i = 0;
        for (const value of this._values.keys()) {
            if (i === index)
                return value;
            i++;
        }
    }
    /**
     * Find index of value in set.
     * @param {T} value Value to find in set
     * @returns {number}
     */
    findIndex(value) {
        const index = this._values.get(value);
        if (index === undefined)
            throw new Error('Value not found in set.');
        return index;
    }
    /**
     * Return size of set.
     * @returns {number}
     */
    size() {
        return this._size;
    }
    /**
     * Returns number of components.
     * @returns {number}
     */
    componentCount() {
        return this._componentCount;
    }
    /**
     * Get the size of the component that the given index belongs to.
     * @param {number} index Index of item whose component size you're looking for.
     * @returns {number}
     */
    componentSize(index) {
        if (typeof index !== 'number')
            throw new TypeError('Index need to be number.');
        if (index < 0 || index >= this.size())
            throw new RangeError('Index out of range.');
        const root = this.getRoot(index);
        return this._componentSizes[root];
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        for (const value of this._values) {
            yield value[0];
        }
    }
}
