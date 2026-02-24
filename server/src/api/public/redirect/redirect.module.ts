import { Module } from '@nestjs/common';
import { LinkModule } from '../link/link.module';
import { RedirectController } from './redirect.controller';

@Module({
	controllers: [RedirectController],
	imports: [LinkModule],
})
export class RedirectModule {}
