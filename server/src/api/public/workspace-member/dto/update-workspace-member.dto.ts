import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length, Min } from 'class-validator';
import { PERMISSIONS } from 'src/libs/constants';
import { CreateWorkspaceMemberDto } from './create-workspace-member.dto';

export class UpdateWorkspaceMemberDto extends OmitType(
	PartialType(CreateWorkspaceMemberDto),
	['invitedByInviteLinkId', 'invitedByUserId'] as const,
) {
	@ApiProperty({ example: [PERMISSIONS.LINKS.VIEW_ALL], enum: PERMISSIONS })
	@IsOptional()
	@IsArray()
	@Min(1)
	@IsString({ each: true })
	permissions?: string[];

	@ApiProperty({ example: 'John Doe' })
	@IsOptional()
	@IsString()
	@Length(4, 40)
	displayName?: string;
}
