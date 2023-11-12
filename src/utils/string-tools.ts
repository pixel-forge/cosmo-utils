import { filterInstances } from "./array-tools";

export const _className = (...params: (string | boolean | undefined)[]) => {
	return filterInstances(params.filter(c => !!c)).join(' ');
};