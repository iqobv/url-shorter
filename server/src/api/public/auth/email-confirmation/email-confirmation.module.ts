import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../auth.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
	controllers: [EmailConfirmationController],
	imports: [forwardRef(() => AuthModule), TokenModule, UserModule],
	providers: [EmailConfirmationService],
})
export class MailConfirmationModule {}
