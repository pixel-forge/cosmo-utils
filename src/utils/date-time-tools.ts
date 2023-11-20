/**
 * A JS implementation of the sleep function.<br/>Don't forget to await!
 * @param ms
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms, undefined));