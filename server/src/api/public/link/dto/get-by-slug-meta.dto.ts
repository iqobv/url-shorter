import { IsIP, IsOptional, IsString } from 'class-validator';

export class GetBySlugMetaDto {
	@IsOptional()
	@IsIP()
	ip?: string;

	@IsOptional()
	@IsString()
	userAgent?: string;

	@IsOptional()
	@IsString()
	referer?: string;
}
