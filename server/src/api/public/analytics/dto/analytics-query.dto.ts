import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class AnalyticsQueryDto {
	@ApiProperty({
		example: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
	})
	@IsOptional()
	@Transform(({ value }: { value: string }) => new Date(value))
	@IsDate()
	fromDate?: Date;

	@ApiProperty({ example: new Date().toISOString() })
	@IsOptional()
	@Transform(({ value }: { value: string }) => new Date(value))
	@IsDate()
	toDate?: Date;
}
