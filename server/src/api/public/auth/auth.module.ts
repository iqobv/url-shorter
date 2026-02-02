import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StringValue } from 'ms';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { OauthModule } from './oauth/oauth.module';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './strategies';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
				signOptions: {
					expiresIn: configService.getOrThrow<StringValue>('ACCESS_TOKEN_TTL'),
				},
			}),
			inject: [ConfigService],
		}),
		TokenModule,
		UserModule,
		OauthModule,
		MailConfirmationModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		LocalStrategy,
		GoogleStrategy,
		EmailConfirmationService,
	],
	exports: [AuthService],
})
export class AuthModule {}
