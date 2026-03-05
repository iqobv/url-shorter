import { IsOptional, IsString } from 'class-validator';

export class ValidateUserDto {
	@IsString()
	email: string;

	@IsString()
	username: string;

	@IsOptional()
	@IsString()
	displayName?: string;

	@IsString()
	providerId: string;

	@IsString()
	provider: string;
}
