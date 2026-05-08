import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReservedWordDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'admin' })
	word: string;
}
