import { ApiProperty } from '@nestjs/swagger';

export class ClickMetricsDto {
	@ApiProperty({ example: 150 })
	total: number;

	@ApiProperty({ example: 100 })
	unique: number;
}
