import { ApiProperty } from '@nestjs/swagger';

export class EmailResultDto {
	@ApiProperty({ example: 'Email verified successfully' })
	message: string;
}
