import { ApiProperty } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';

export class ReservedWordDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'admin' })
	word: string;
}
