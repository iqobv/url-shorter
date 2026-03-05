import { AuditChange, AuditChangeValue } from '../types';

export const getDiff = <T extends object>(
	oldObj: T,
	newObj: Partial<T>,
): AuditChange[] => {
	return Object.keys(newObj)
		.filter((key) => {
			const k = key as keyof T;
			return newObj[k] !== undefined && newObj[k] !== oldObj[k];
		})
		.map((key) => {
			const k = key as keyof T;
			return {
				field: key,
				oldValue: oldObj[k] as AuditChangeValue,
				newValue: newObj[k] as AuditChangeValue,
			};
		});
};
