export function exists<T extends any = any>(item: T | undefined | null): item is T {
	return item !== undefined && item !== null;
}