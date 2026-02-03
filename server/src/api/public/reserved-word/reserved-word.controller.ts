import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservedWordDto } from './dto';
import { ReservedWordService } from './reserved-word.service';

@ApiTags('Reserved Words')
@Controller('reserved-words')
export class ReservedWordController {
	constructor(private readonly reservedWordService: ReservedWordService) {}

	@ApiOperation({ summary: 'Get all reserved words' })
	@ApiOkResponse({ type: [ReservedWordDto] })
	@Get()
	async getAllReservedWords() {
		return await this.reservedWordService.getAllWords();
	}
}
