import { ApiProperty } from '@nestjs/swagger';

export class DefaultFieldsDto {
	@ApiProperty({ example: 'a9b12e41-5b37-40b5-99aa-30a5be176c04' })
	id: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
