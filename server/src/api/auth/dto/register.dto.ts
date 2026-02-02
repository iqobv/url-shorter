import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/api/user/dto';

export class RegisterDto extends OmitType(CreateUserDto, [
	'emailVerified',
] as const) {}
