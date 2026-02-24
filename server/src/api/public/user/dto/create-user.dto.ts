import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

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
		minSymbols: 0,
	})
	password?: string;

	@ApiProperty({
		example: UserRole.USER,
		enum: UserRole,
		required: false,
	})
	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;

	@ApiProperty({
		example: false,
	})
	@IsBoolean()
	emailVerified: boolean;
}
