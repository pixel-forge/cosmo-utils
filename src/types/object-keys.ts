/**
 * Given type <T> which is an object, and optional type <ValueType>(defaults to any), returns all keys of <T> which values are of type <ValueType>
 */
export type KeysOfType<T extends object, ValueType extends any> = { [K in keyof T]: T[K] extends ValueType ? K : never }[keyof T];

/**
 * Given type <T> which is an object, returns a new type built of only optional properties of <T>
 */
export type OptionalSubSet<T extends object> = { [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K] };

/**
 * Given type <T> which is an object, and optional type <ValueType>(defaults to any), returns all keys of <T> which values are of type <ValueType>
 */
export type OptionalKeysOfType<T extends object, ValueType extends any = any> = NonNullable<KeysOfType<OptionalSubSet<T>, ValueType | undefined>>;

/**
 * Given type <T> which is an object, returns all keys of <T> which values are a function
 */
export type FunctionKeys<T extends object> = KeysOfType<T, Function>;

/**
 * Given type <T> which is an object and optional type <ArrayType>(defaults to <any>),
 * returns all keys of <T> which values are an array of type <ArrayType>
 */
export type ArrayKeys<T extends object, ArrayType extends any = any> = KeysOfType<T, Array<ArrayType>>;

/**
 * Given type <T> which is an object, returns all keys of <T> which values are a string
 */
export type StringKeys<T extends object> = KeysOfType<T, string>;

/**
 * Given type <T> which is an object, returns all keys of <T> which values are a number
 */
export type NumberKeys<T extends object> = KeysOfType<T, number>;

/**
 * Given type <T> which is an object, returns all keys of <T> which values are a boolean
 */
export type BooleanKeys<T extends object> = KeysOfType<T, boolean>;