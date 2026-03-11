export const createErrorSchema =
	<T extends string>() =>
	(key: T) => ({ error: key });
