import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class GetAllLinksDto {
	@ApiProperty({
		description: 'Number of links to return per page',
		example: 20,
	})
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	@Min(1)
	limit?: number = 20;

	@ApiProperty({ description: 'Page number for pagination', example: 1 })
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	@Min(1)
	page?: number = 1;

	@ApiProperty({
		description: 'Field to sort by (e.g., createdAt, clicks)',
		example: 'createdAt',
	})
	@IsEnum(['createdAt', 'totalClicks', 'updatedAt', 'uniqueClicks'] as const)
	@IsOptional()
	sortBy?: 'createdAt' | 'totalClicks' | 'updatedAt' | 'uniqueClicks' =
		'createdAt';

	@ApiProperty({
		description: 'Sort order (asc or desc)',
		example: 'desc',
	})
	@IsEnum(['asc', 'desc'])
	@IsOptional()
	sortOrder?: 'asc' | 'desc' = 'desc';
}
