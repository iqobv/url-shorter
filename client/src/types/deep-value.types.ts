export type DeepValue<T, K> = T extends K
	? T
	: T extends readonly unknown[]
		? DeepValue<T[number], K>
		: T extends object
			? DeepValue<T[keyof T], K>
			: never;
