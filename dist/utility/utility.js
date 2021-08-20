/**
 * Default equality function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultEquals(a, b) {
    return a === b;
}
/**
 * Default minimum first comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultMinCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
/**
 * Promisified setTimeout to asynchronously pause execution.
 * @param {number} milliseconds Number of milliseconds to pause.
 */
export function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
/**
 * Tests an object to see if it is iterable.
 * @param obj Object to test
 * @returns {boolean} Indicating whether obj is an iterable.
 */
export function isIterable(obj) {
    if (!obj)
        return false;
    return typeof obj[Symbol.iterator] === 'function';
}
