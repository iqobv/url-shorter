import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

export class ClaimLinkItemDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	@IsNotEmpty()
	linkId: string;

	@ApiProperty({ example: 'your-claim-token' })
	@IsString()
	@IsNotEmpty()
	claimToken: string;
}

export class BulkClaimLinksDto {
	@ApiProperty({ type: [ClaimLinkItemDto] })
	@ValidateNested({ each: true })
	@Type(() => ClaimLinkItemDto)
	@IsNotEmpty({ each: true })
	links: ClaimLinkItemDto[];
}
