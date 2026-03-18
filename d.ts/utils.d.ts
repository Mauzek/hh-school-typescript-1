// ==========================================
// 1. promiseAll
// ==========================================
export type PromiseAllResult<T extends readonly unknown[]> = {
  -readonly [P in keyof T]: Awaited<T[P]>;
};

export declare function promiseAll<T extends readonly unknown[] | []>(
  promises: T,
): Promise<PromiseAllResult<T>>;


// ==========================================
// 2. delay
// ==========================================
export declare function delay(ms: number): Promise<void>;


// ==========================================
// 3. memoize
// ==========================================
export declare function memoize<T extends unknown[], R>(fn: (...args: T) => R,): (...args: T) => R;


// ==========================================
// 4. typedObject
// ==========================================
export declare function typedObject<T extends object>(
  schema: Record<string, string>,
): T;
