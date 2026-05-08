import { PrismaService } from '@infra/prisma/prisma.service';
import {
	ERRORS,
	STATIC_RESERVED_WORDS,
	SUCCESS_MESSAGES,
} from '@libs/constants';
import {
	ConflictException,
	Injectable,
	NotFoundException,
	OnModuleInit,
} from '@nestjs/common';
import { AddReservedWordDto } from './dto';

@Injectable()
export class ReservedWordService implements OnModuleInit {
	private reservedWords: Set<string> = new Set();

	constructor(private readonly prismaService: PrismaService) {}

	async onModuleInit() {
		await this.refreshCache();
	}

	async refreshCache() {
		const words = await this.prismaService.reservedWord.findMany();
		this.reservedWords = new Set(words.map((w) => w.word.toLowerCase()));
	}

	async addWord(dto: AddReservedWordDto) {
		const { word } = dto;

		const lowerWord = word.toLowerCase();

		const existing = await this.prismaService.reservedWord.findUnique({
			where: { word: lowerWord },
		});

		if (existing)
			throw new ConflictException(
				ERRORS.RESERVED_WORDS.RESERVED_WORD_ALREADY_EXISTS,
			);

		const created = await this.prismaService.reservedWord.create({
			data: { word: lowerWord },
		});

		this.reservedWords.add(created.word.toLowerCase());

		return created;
	}

	async getAllWords() {
		return await this.prismaService.reservedWord.findMany();
	}

	async deleteWord(id: string) {
		const word = await this.prismaService.reservedWord.findUnique({
			where: { id },
		});

		if (!word)
			throw new NotFoundException(
				ERRORS.RESERVED_WORDS.RESERVED_WORD_NOT_FOUND,
			);

		await this.prismaService.reservedWord.delete({ where: { id } });

		await this.refreshCache();

		return SUCCESS_MESSAGES.RESERVED_WORDS.RESERVED_WORD_DELETED;
	}

	isReserved(word: string): boolean {
		const lowerWord = word.toLowerCase();

		return (
			this.reservedWords.has(lowerWord) ||
			STATIC_RESERVED_WORDS.includes(lowerWord)
		);
	}
}
