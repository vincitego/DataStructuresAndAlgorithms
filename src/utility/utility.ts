/**
 * Default minimum first comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultMinCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}


/**
 * Default maximum first comparison function.
 * @param a First element.
 * @param b Second element.
 */
export function defaultMaxCompare<T>(a: T, b: T): number {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
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