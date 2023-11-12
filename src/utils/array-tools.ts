import { exists } from "./general-tools";

export function removeItemFromArray<T>(arr: T[], instance: T) {
	const index = arr.indexOf(instance);
	if (index === -1)
		return;

	arr.splice(index, 1);
};

export function sortArray<T>(array: T[], map: keyof T | (keyof T)[] | ((item: T) => any) = i => i, invert = false): T[] {
	const functionMap = map;
	if (typeof functionMap === 'function') {
		const compareFn = (a: T, b: T) => {
			const _a = functionMap(a);
			const _b = functionMap(b);
			return (_a < _b ? -1 : (_a === _b ? 0 : 1)) * (invert ? -1 : 1);
		};

		return array.sort(compareFn);
	}

	let keys: (keyof T)[];
	if (!Array.isArray(map))
		keys = [map as keyof T];
	else
		keys = map;

	return keys.reduce((array, key) => {
		return sortArray<T>(array, item => item[key]);
	}, array) as T[];
}

export function filterInstances<T>(arr?: (T | undefined | null | void)[]): T[] {
	return (arr?.filter(item=> exists(item)) ?? []) as T[];
}