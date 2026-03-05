import { ApiProperty } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';

export class WorkspaceDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'My Workspace' })
	name: string;

	@ApiProperty({ example: false })
	isPersonal: boolean;

	@ApiProperty({ example: false })
	isDefault: boolean;

	@ApiProperty({ example: 'a9b12e41-5b37-40b5-99aa-30a5be176c04' })
	ownerId: string;

	@ApiProperty({ example: null })
	deletedAt: Date | null;
}
