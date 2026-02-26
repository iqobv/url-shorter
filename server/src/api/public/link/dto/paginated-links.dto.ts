import { ApiProperty } from '@nestjs/swagger';
import { LinkDto } from './link.dto';

export class PaginatedLinksDto {
	@ApiProperty({ type: [LinkDto] })
	items: LinkDto[];

	@ApiProperty({
		description: 'Pagination metadata',
		type: Object,
		example: {
			total: 100,
			page: 1,
			limit: 20,
			totalPages: 5,
		},
	})
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}
