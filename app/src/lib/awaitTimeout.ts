/**
 * Return a promise that is resolved after given amount of milli seconds
 * @param ms - milli seconds
 */
export function awaitTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
