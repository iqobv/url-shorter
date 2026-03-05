import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length, Min } from 'class-validator';
import { CreateWorkspaceMemberDto } from './create-workspace-member.dto';

export class UpdateWorkspaceMemberDto extends OmitType(
	PartialType(CreateWorkspaceMemberDto),
	['invitedByInviteLinkId', 'invitedByUserId'] as const,
) {
	@IsOptional()
	@IsArray()
	@Min(1)
	@IsString({ each: true })
	permissions?: string[];

	@IsOptional()
	@IsString()
	@Length(4, 40)
	displayName?: string;
}
