import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { ClickModule } from './click/click.module';
import { LinkModule } from './link/link.module';
import { ReservedWordModule } from './reserved-word/reserved-word.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		TokenModule,
		LinkModule,
		ClickModule,
		AnalyticsModule,
		UserProviderModule,
		ReservedWordModule,
		RedirectModule,
	],
})
export class PublicModule {}
