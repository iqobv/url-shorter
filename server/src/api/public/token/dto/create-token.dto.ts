import { TokenType } from '@generated/prisma/enums';
import { IsDate, IsEnum, IsUUID } from 'class-validator';

export class CreateTokenDto {
	@IsUUID('4')
	userId: string;
	@IsEnum(TokenType)
	tokenType: TokenType;
	@IsDate()
	expiresAt: Date;
}
