import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class AnalyticsQueryDto {
	@ApiProperty({
		example: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	fromDate?: Date;

	@ApiProperty({ example: new Date().toISOString() })
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	toDate?: Date;
}
