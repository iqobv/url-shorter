import { IsUUID } from 'class-validator';
import { GetBySlugMetaDto } from '../../link/dto';

export class CreateClickDto extends GetBySlugMetaDto {
	@IsUUID('4')
	linkId: string;
}
