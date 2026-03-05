import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateInviteLinkDto {
	@ApiProperty({ example: 'a9b12e41-5b37-40b5-99aa-30a5be176c04' })
	@IsUUID('4')
	workspaceId: string;

	@ApiProperty({ example: 'a9b12e41-5b37-40b5-99aa-30a5be176c04' })
	@IsUUID('4')
	roleId: string;

	@ApiProperty({ example: 5, required: false })
	@IsOptional()
	@IsNumber()
	@Min(0)
	maxUseCount?: number;

	@ApiProperty({ example: new Date(), required: false })
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	expiresAt?: Date;
}
