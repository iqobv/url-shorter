import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { UserRole } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(dto: CreateUserDto) {
		const { email, password, emailVerified } = dto;

		const alreadyExists = await this.findByEmail(email);

		if (alreadyExists) {
			throw new ConflictException('User with this email already exists');
		}

		const count = await this.prismaService.user.count();

		const passwordToStore = password ? await hash(password) : null;

		const user = await this.prismaService.user.create({
			data: {
				email,
				password: passwordToStore,
				emailVerified: emailVerified,
				role: count === 0 ? UserRole.ADMIN : UserRole.USER,
			},
			select: userSelect,
		});

		return user;
	}

	async findById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: full ? undefined : userSelect,
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async findByEmail(email: string, full: boolean = false) {
		return await this.prismaService.user.findUnique({
			where: { email },
			select: full ? undefined : userSelect,
		});
	}

	async updateUser(id: string, dto: UpdateUserDto) {
		const { email, password, ...rest } = dto;

		const user = await this.findById(id, true);

		if (email) {
			const existingUser = await this.findByEmail(email);

			if (existingUser && existingUser.id !== id) {
				throw new ConflictException('User with this email already exists');
			}
		}

		let passwordToStore: string | null = null;

		if (password) {
			const oldPassword = user.password;
			const isSame = oldPassword
				? await verify(oldPassword || '', password)
				: false;

			if (!isSame) {
				passwordToStore = await hash(password);
			} else {
				passwordToStore = null;
			}
		}

		const updateUser = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				...(email && { email }),
				...(password && passwordToStore !== null
					? { password: passwordToStore }
					: {}),
				...rest,
			},
			select: userSelect,
		});

		return updateUser;
	}

	async comparePassword(userId: string, password: string) {
		const user = await this.findById(userId, true);

		if (!user.password) {
			return false;
		}

		return await verify(user.password, password);
	}
}
