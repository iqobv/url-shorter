import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from 'class-validator';

export class CreateWorkspaceMemberDto {
	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsOptional()
	@IsUUID('4')
	invitedByUserId?: string;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsOptional()
	@IsUUID('4')
	invitedByInviteLinkId?: string;

	@ApiProperty({
		example: ['550e8400-e29b-41d4-a716-446655440000'],
	})
	@IsArray()
	@IsUUID('4', { each: true })
	@MinLength(1)
	roleIds: string[];

	@IsOptional()
	@IsString()
	invitedByName?: string;
}
