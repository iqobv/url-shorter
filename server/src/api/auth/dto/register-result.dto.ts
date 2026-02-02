import { ApiProperty } from '@nestjs/swagger';

export class RegisterResultDto {
	@ApiProperty({ example: 'Account created. Please verify your email.' })
	message: string;
}
