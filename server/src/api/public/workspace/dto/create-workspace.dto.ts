import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
	@ApiProperty({
		description: 'Whether the workspace is a personal workspace',
		default: false,
		example: false,
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	isPersonal: boolean;

	@ApiProperty({
		description: 'Whether the workspace is the default workspace',
		default: false,
		example: false,
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	isDefault: boolean;

	@ApiProperty({
		description: 'The name of the workspace',
		example: 'My Workspace',
	})
	@IsString()
	name: string;
}
