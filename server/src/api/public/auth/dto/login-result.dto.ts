import { ApiProperty } from '@nestjs/swagger';
import { UserSwaggerDto } from '../../user/dto';

export class LoginResultDto {
	@ApiProperty({ type: UserSwaggerDto })
	user: UserSwaggerDto;
}
