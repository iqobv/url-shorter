import { forwardRef, Module } from '@nestjs/common';
import { UserProviderModule } from '../../user-provider/user-provider.module';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../auth.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
	controllers: [OauthController],
	imports: [forwardRef(() => AuthModule), UserModule, UserProviderModule],
	providers: [OauthService],
	exports: [OauthService],
})
export class OauthModule {}
