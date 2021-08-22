export class DisjointSet {
    /**
     * Creates a new Disjoint Set from a given list of values.
     * @param {number} size Size of set.
     */
    constructor(size) {
        if (typeof size !== 'number')
            throw new TypeError('Size need to be number.');
        if (size <= 1)
            throw new RangeError('Minimum size is 2.');
        this._nodes = [];
        this._componentCount = size;
        this._componentSizes = new Array(size).fill(1);
        for (let i = 0; i < size; i++) {
            this._nodes.push(i);
        }
    }
    /**
     * Find root node of component.
     * @param {number} index Index of set item to find root node of.
     * @returns {number}
     */
    find(index) {
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
     * Attempts to union two nodes together.
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
        const root1 = this.find(index1);
        const root2 = this.find(index2);
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
            throw new Error('This should not happen');
        }
        return true;
    }
    /**
     * Return size of set.
     * @returns {number}
     */
    size() {
        return this._nodes.length;
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
        const root = this.find(index);
        return this._componentSizes[root];
    }
    /**
     * Iterator to allow looping.
     */
    *[Symbol.iterator]() {
        for (const value of this._nodes) {
            yield value;
        }
    }
}
