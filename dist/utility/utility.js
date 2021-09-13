/**
 * Default minimum first comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultMinCompare(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
/**
 * Default maximum first comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultMaxCompare(a, b) {
    if (a < b)
        return 1;
    if (a > b)
        return -1;
    return 0;
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
