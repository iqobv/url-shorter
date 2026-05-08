import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { lookup } from 'geoip-country';
import { UAParser } from 'ua-parser-js';
import { CreateClickDto } from './dto';

@Injectable()
export class ClickService {
	constructor(private readonly prismaService: PrismaService) {}

	async createClick(dto: CreateClickDto, tx: Prisma.TransactionClient) {
		const { linkId, ip, userAgent, referer } = dto;

		const fingerprint = createHash('sha256')
			.update(`${ip}-${userAgent}`)
			.digest('hex');

		const existingClick = await tx.click.findFirst({
			where: {
				linkId,
				fingerprint,
			},
		});

		const isUnique = !existingClick;

		const { browser, device, os } = UAParser(userAgent);

		const geo = lookup(ip!);

		return await tx.click.create({
			data: {
				fingerprint,
				country: geo?.country || null,
				browser: browser?.name || null,
				device: device?.type || null,
				os: os?.name || null,
				referrer: referer || null,
				isUnique,
				clickedAt: new Date(),
				link: { connect: { id: linkId } },
			},
		});
	}
}
