import { Module } from '@nestjs/common';
import { IsNotReservedConstraint } from 'src/api/public/link/validators';
import { ClickModule } from '../click/click.module';
import { ReservedWordModule } from '../reserved-word/reserved-word.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
	controllers: [LinkController],
	providers: [LinkService, IsNotReservedConstraint],
	exports: [LinkService],
	imports: [ReservedWordModule, ClickModule],
})
export class LinkModule {}
