/**
 * Create array of item using iterator
 * @param iterator - iterator
 * @param count - array size
 */
export function fillByIndex<T>(iterator: (i: number) => T, count: number) {
  return Array(count)
    .fill(null)
    .map((_, i) => iterator(i))
}
