import { ApiProperty } from '@nestjs/swagger';
import { PERMISSIONS } from 'src/libs/constants';
import { DefaultFieldsDto } from 'src/libs/dto';
import { Permissions } from 'src/libs/types';

export class RoleDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'a426aa04-f9b2-41db-9ebb-6c0de5c4dfd8' })
	workspaceId: string;

	@ApiProperty({ example: 'Viewer' })
	name: string;

	@ApiProperty({ example: null })
	description: string | null;

	@ApiProperty({ example: ['links.view_all'], enum: PERMISSIONS })
	permissions: Permissions[];

	@ApiProperty({ example: null })
	deletedAt: Date | null;
}
