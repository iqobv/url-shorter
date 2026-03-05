import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
	@ApiProperty({ example: 'An error occurred' })
	message: string;

	@ApiProperty({ example: 'ERROR_CODE' })
	code: string;
}
