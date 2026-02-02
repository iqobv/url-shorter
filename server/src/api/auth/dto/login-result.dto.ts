import { ApiProperty } from '@nestjs/swagger';
import { UserSwaggerDto } from 'src/api/user/dto';

export class LoginResultDto {
	@ApiProperty({ type: UserSwaggerDto })
	user: UserSwaggerDto;
}
