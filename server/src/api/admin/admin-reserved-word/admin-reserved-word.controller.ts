import { AddReservedWordDto } from '@api/public/reserved-word/dto';
import { ReservedWordService } from '@api/public/reserved-word/reserved-word.service';
import { UserRole } from '@generated/prisma/enums';
import { ERRORS, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

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
