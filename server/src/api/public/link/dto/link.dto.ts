import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class LinkDto extends DefaultFieldsDto {
	@ApiProperty({ example: null })
	userId: string | null;

	@ApiProperty({ example: 'https://example.com/some/very/long/url' })
	originalUrl: string;

	@ApiProperty({ example: 'abcd1234' })
	slug: string;

	@ApiProperty({ example: false })
	isCustom: boolean;

	@ApiProperty({ example: 42 })
	totalClicks: number;

	@ApiProperty({ example: 37 })
	uniqueClicks: number;

	@ApiProperty({ example: 'some-claim-token' })
	claimToken: string | null;
}
