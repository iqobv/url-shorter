import { IsNotReservedConstraint } from '@api/public/link/validators';
import { Module } from '@nestjs/common';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { ClickModule } from '../click/click.module';
import { ReservedWordModule } from '../reserved-word/reserved-word.module';
import { WorkspaceCommonModule } from '../workspace-common/workspace-common.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
	controllers: [LinkController],
	providers: [LinkService, IsNotReservedConstraint],
	exports: [LinkService],
	imports: [
		ReservedWordModule,
		ClickModule,
		WorkspaceModule,
		AuditLogModule,
		WorkspaceCommonModule,
	],
})
export class LinkModule {}
