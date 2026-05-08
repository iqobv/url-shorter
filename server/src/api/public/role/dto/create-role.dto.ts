import { PERMISSIONS } from '@libs/constants';
import { IsPermissions } from '@libs/decorators';
import { Permissions } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
	@ApiProperty({ example: 'Admin', description: 'Name of the role' })
	@IsString()
	name: string;

	@ApiProperty({
		example: 'Role with full access',
		description: 'Description of the role',
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		example: [PERMISSIONS.WORKSPACE.EDIT, PERMISSIONS.WORKSPACE.DELETE],
		description: 'Array of permissions assigned to the role',
	})
	@IsPermissions()
	permissions: Permissions[];
}
