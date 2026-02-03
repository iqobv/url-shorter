import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { IsNotReserved } from '../decorators';

export class CreateLinkDto {
	@ApiProperty({
		description: 'The original URL to be shortened',
		example: 'https://www.example.com/some/long/path',
	})
	@IsUrl({
		require_tld: true,
		require_protocol: true,
		protocols: ['https'],
		require_valid_protocol: true,
	})
	originalUrl: string;

	@ApiProperty({
		description: 'Custom alias for the shortened URL (optional)',
		example: 'my-custom-alias',
		required: false,
	})
	@IsOptional()
	@IsString()
	@Matches(/^[a-zA-Z0-9_-]*$/)
	@IsNotReserved()
	customAlias?: string;
}
