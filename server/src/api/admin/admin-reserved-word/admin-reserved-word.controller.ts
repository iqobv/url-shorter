import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { AddReservedWordDto } from 'src/api/public/reserved-word/dto';
import { ReservedWordService } from 'src/api/public/reserved-word/reserved-word.service';
import { ERRORS, SUCCESS_MESSAGES } from 'src/libs/constants';
import { Auth } from 'src/libs/decorators';
import { createCustomMessageDto } from 'src/libs/utils';

@ApiTags('Admin Reserved Words')
@Controller('admin/reserved-words')
export class AdminReservedWordController {
	constructor(private readonly reservedWordService: ReservedWordService) {}

	@ApiOperation({ summary: 'Add a new reserved word' })
	@Auth(UserRole.ADMIN)
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERRORS.RESERVED_WORDS.RESERVED_WORD_ALREADY_EXISTS,
		),
	})
	@Post('add')
	async addReservedWord(@Body() dto: AddReservedWordDto) {
		return await this.reservedWordService.addWord(dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Delete a reserved word' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.RESERVED_WORDS.RESERVED_WORD_DELETED,
		),
	})
	@Delete(':id')
	async deleteReservedWord(id: string) {
		return await this.reservedWordService.deleteWord(id);
	}
}
