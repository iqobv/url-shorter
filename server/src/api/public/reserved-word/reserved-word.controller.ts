import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservedWordService } from './reserved-word.service';

@ApiTags('Reserved Words')
@Controller('reserved-words')
export class ReservedWordController {
	constructor(private readonly reservedWordService: ReservedWordService) {}

	@Get()
	async getAllReservedWords() {
		return await this.reservedWordService.getAllWords();
	}
}
