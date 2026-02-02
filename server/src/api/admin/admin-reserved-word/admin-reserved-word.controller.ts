import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { AddReservedWordDto } from 'src/api/public/reserved-word/dto';
import { ReservedWordService } from 'src/api/public/reserved-word/reserved-word.service';
import { Auth } from 'src/libs/decorators';

@ApiTags('Admin Reserved Words')
@Controller('admin/reserved-words')
export class AdminReservedWordController {
	constructor(private readonly reservedWordService: ReservedWordService) {}

	@ApiOperation({ summary: 'Add a new reserved word' })
	@Auth(UserRole.ADMIN)
	@Post('add')
	async addReservedWord(@Body() dto: AddReservedWordDto) {
		return await this.reservedWordService.addWord(dto);
	}
}
