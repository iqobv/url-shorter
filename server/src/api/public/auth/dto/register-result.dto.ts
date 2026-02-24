import { ApiProperty } from '@nestjs/swagger';

export class RegisterResultDto {
	@ApiProperty({ example: true })
	success: boolean;

	@ApiProperty({ example: 'REGISTRATION_SUCCESS_CONFIRM_EMAIL' })
	code: string;
}
