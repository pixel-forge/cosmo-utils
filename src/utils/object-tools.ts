export const _keys = <T extends { [k: string]: any }, K extends keyof T>(obj: T): K[] => {
	return Object.keys(obj) as K[];
};