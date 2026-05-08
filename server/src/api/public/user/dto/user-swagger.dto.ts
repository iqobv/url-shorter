import { UserRole } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserSwaggerDto {
	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	id: string;

	@ApiProperty({ example: 'user@example.com' })
	email: string;

	@ApiProperty({ example: true })
	emailVerified: boolean;

	@ApiProperty({ example: UserRole.USER })
	role: UserRole;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
