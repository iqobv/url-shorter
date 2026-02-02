import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		example: 'example@mail.com',
	})
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'P@ssw0rd!',
		required: false,
	})
	@IsOptional()
	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
	})
	password?: string;

	@ApiProperty({
		example: false,
	})
	@IsBoolean()
	emailVerified: boolean;
}
