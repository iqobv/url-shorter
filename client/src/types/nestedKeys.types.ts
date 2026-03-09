type LeaveKeys<T, K extends keyof T> = K extends string
	? T[K] extends object
		? `${K}.${LeaveKeys<T[K], keyof T[K]>}`
		: K
	: never;

export type NestedKeys<T> = LeaveKeys<T, keyof T>;
