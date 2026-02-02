import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma';
import { CreateUserProviderDto } from './dto';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUserProvider(dto: CreateUserProviderDto) {
		const { userId, provider, providerId } = dto;

		const exists = await this.getByProviderId(provider, providerId);

		if (exists) {
			throw new ConflictException('User provider already exists');
		}

		return await this.prismaService.userProvider.create({
			data: {
				userId,
				provider,
				providerId,
			},
		});
	}

	async getByProviderId(provider: string, providerId: string) {
		return this.prismaService.userProvider.findUnique({
			where: {
				provider_providerId: {
					provider,
					providerId,
				},
			},
			include: {
				user: {
					select: userSelect,
				},
			},
		});
	}
}
