/**
 * Given type <T>, if <T> is a function, returns the types of each argument in the order they are needed.
 */
export type FunctionParams<T> = T extends (...args: any) => any ? Parameters<T> : never

/**
 * Given type <T>, if <T> is a function, returns the return type
 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;