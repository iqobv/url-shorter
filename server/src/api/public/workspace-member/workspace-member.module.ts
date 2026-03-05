import { Module } from '@nestjs/common';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { WorkspaceCommonModule } from '../workspace-common/workspace-common.module';
import { WorkspaceMemberController } from './workspace-member.controller';
import { WorkspaceMemberService } from './workspace-member.service';

@Module({
	controllers: [WorkspaceMemberController],
	providers: [WorkspaceMemberService],
	imports: [WorkspaceCommonModule, AuditLogModule],
	exports: [WorkspaceMemberService],
})
export class WorkspaceMemberModule {}
