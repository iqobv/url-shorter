import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { LinkModule } from './link/link.module';
import { ClickModule } from './click/click.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UserProviderModule } from './user-provider/user-provider.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		TokenModule,
		LinkModule,
		ClickModule,
		AnalyticsModule,
		UserProviderModule,
	],
})
export class ApiModule {}
