import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AddReservedWordDto {
	@ApiProperty({
		example: 'admin',
	})
	@IsString()
	@MinLength(1)
	word: string;
}
