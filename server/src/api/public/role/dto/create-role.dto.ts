import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PERMISSIONS } from 'src/libs/constants';
import { IsPermissions } from 'src/libs/decorators';
import { Permissions } from 'src/libs/types';

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
