import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
	@ApiProperty({ example: '9b64ad75-8aca-4fa5-ab62-1fef6a65c8ae' })
	id: string;

	@ApiProperty({ example: 'johndoe' })
	username: string;

	@ApiProperty({ example: 'John Doe' })
	displayName: string | null;
}
