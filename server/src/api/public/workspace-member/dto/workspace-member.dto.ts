import { PERMISSIONS } from '@libs/constants';
import { DefaultFieldsDto } from '@libs/dto';
import { Permissions } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../../role/dto';

export class WorkspaceMembersDto extends DefaultFieldsDto {
	@ApiProperty({ example: '9b64ad75-8aca-4fa5-ab62-1fef6a65c8ae' })
	userId: string;

	@ApiProperty({ example: '9b64ad75-8aca-4fa5-ab62-1fef6a65c8ae' })
	workspaceId: string;

	@ApiProperty({ example: null })
	invitedByUserId: string | null;

	@ApiProperty({ example: null })
	invitedByInviteLinkId: string | null;

	@ApiProperty({ example: 'John Doe' })
	displayName: string;

	@ApiProperty({ example: ['members.view'], enum: PERMISSIONS })
	permissions: Permissions[];

	@ApiProperty({ example: null })
	deletedAt: Date | null;

	@ApiProperty({ type: [RoleDto] })
	roles: RoleDto[];
}
