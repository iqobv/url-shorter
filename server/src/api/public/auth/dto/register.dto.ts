import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto';

export class RegisterDto extends OmitType(CreateUserDto, [
	'emailVerified',
	'role',
] as const) {}
