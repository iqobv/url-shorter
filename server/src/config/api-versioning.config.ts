import { VersioningOptions, VersioningType } from '@nestjs/common';

export const getApiVersioningConfig = (): VersioningOptions => ({
	defaultVersion: '1',
	type: VersioningType.URI,
});
