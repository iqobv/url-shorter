import { TokenType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToken(dto: CreateTokenDto, removeByType: boolean = true) {
		const { expiresAt, tokenType, userId } = dto;

		const { token, hashedToken } = this.generateToken();

		if (removeByType) {
			await this.prismaService.token.deleteMany({
				where: {
					userId: userId,
					type: tokenType,
				},
			});
		}

		const tokenRecord = await this.prismaService.token.create({
			data: {
				token: hashedToken,
				expiresAt: expiresAt,
				type: tokenType,
				user: { connect: { id: userId } },
			},
		});

		return { ...tokenRecord, token };
	}

	generateToken() {
		const token = crypto.randomBytes(64).toString('hex');
		const hashedToken = this.hashToken(token);

		return { token, hashedToken };
	}

	async getByToken(token: string, type: TokenType) {
		const hashedToken = this.hashToken(token);

		return await this.prismaService.token.findFirst({
			where: { token: hashedToken, type, expiresAt: { gt: new Date() } },
			include: { user: true },
		});
	}

	async validateToken(userId: string, token: string, type: TokenType) {
		const hashedToken = this.hashToken(token);

		const tokenRecord = await this.prismaService.token.findFirst({
			where: {
				userId,
				token: hashedToken,
				type,
				expiresAt: { gt: new Date() },
			},
		});

		return !!tokenRecord;
	}

	async removeToken(userId: string, token: string, type?: TokenType) {
		const hashedToken = this.hashToken(token);

		await this.prismaService.token.deleteMany({
			where: { userId, token: hashedToken, type },
		});

		return true;
	}

	private hashToken(token: string) {
		return crypto.createHash('sha256').update(token).digest('hex');
	}
}
