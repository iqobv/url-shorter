import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateLinkDto } from './dto';

@Injectable()
export class LinkService {
	constructor(private readonly prismaService: PrismaService) {}

	async createShortLink(dto: CreateLinkDto) {
		const { originalUrl, customAlias } = dto;
	}
}
