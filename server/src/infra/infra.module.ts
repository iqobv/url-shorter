import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
	imports: [PrismaModule, MailerModule],
})
export class InfraModule {}
