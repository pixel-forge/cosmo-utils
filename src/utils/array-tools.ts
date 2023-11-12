export const removeItemFromArray = <T>(arr: T[], instance: T) => {
	const index = arr.indexOf(instance);
	if (index === -1)
		return;

	arr.splice(index, 1);
};