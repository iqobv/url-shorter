import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { STATIC_RESERVED_WORDS } from 'src/libs/constants';
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

		if (existing) throw new ConflictException('Reserved word already exists');

		const created = await this.prismaService.reservedWord.create({
			data: { word: lowerWord },
		});

		this.reservedWords.add(created.word.toLowerCase());

		return created;
	}

	async getAllWords() {
		return await this.prismaService.reservedWord.findMany();
	}

	isReserved(word: string): boolean {
		const lowerWord = word.toLowerCase();

		return (
			this.reservedWords.has(lowerWord) ||
			STATIC_RESERVED_WORDS.includes(lowerWord)
		);
	}
}
