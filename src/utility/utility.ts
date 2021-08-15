export interface EqualsFunction<T> {
  (a: T, b: T): boolean;
}


export interface CompareFunction<T> {
  (a: T, b: T): number;
}


/**
 * Default equality function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}


/**
 * Default comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultCompare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
}


/**
 * Promisified setTimeout to asynchronously pause execution.
 * @param {number} milliseconds Number of milliseconds to pause.
 */
export function sleep(milliseconds: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}


/**
 * Tests an object to see if it is iterable.
 * @param obj Object to test
 * @returns {boolean} Indicating whether obj is an iterable.
 */
export function isIterable(obj: any): boolean {
  if (!obj) return false;
  return typeof obj[Symbol.iterator] === 'function';
}