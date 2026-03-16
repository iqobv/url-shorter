import { IZodCustomParams } from '@/types';
import z from 'zod';

z.config({
	customError: (issue) => {
		const { code, path, params, ...rest } = issue;

		const customParams = (params as IZodCustomParams | undefined) ?? {};

		return JSON.stringify({
			code: customParams.i18n ?? code,
			field:
				customParams.label ?? path?.[path.length - 1] ?? path?.[0] ?? 'field',
			...rest,
		});
	},
	jitless: true,
});
