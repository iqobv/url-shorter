import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class InviteLinkDto extends DefaultFieldsDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	roleId: string;

	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	workspaceId: string;

	@ApiProperty({ example: new Date() })
	expiresAt: Date | null;

	@ApiProperty({ example: 5 })
	maxUseCount: number | null;

	@ApiProperty({ example: '0dq3m1l0nl' })
	code: string;

	@ApiProperty({ example: 0 })
	useCount: number;

	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	createdByUserId: string;
}
