/**
 * min and max included
 * @returns random number
 */
export function rng(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * ensures min <= n <= max (Inclusive!)
 * @param n number to test against upper and lower bounds
 * @param min the lowest allowed value for n
 * @param max the highest allowed value for n
 * @returns n if n satisfies min <= n <= max, otherwise min or max are returned
 */
export function ensureNumberInRange(n: number, min: number, max: number): number {
    return Math.max(min, Math.min(n, max))
}
