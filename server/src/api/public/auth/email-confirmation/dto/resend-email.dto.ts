import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendEmailDto {
	@ApiProperty({ example: 'example@example.com' })
	@IsEmail()
	email: string;
}
