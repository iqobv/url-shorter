import { Module } from '@nestjs/common';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { RoleModule } from '../role/role.module';
import { WorkspaceCommonModule } from '../workspace-common/workspace-common.module';
import { WorkspaceMemberModule } from '../workspace-member/workspace-member.module';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
	imports: [
		RoleModule,
		WorkspaceMemberModule,
		AuditLogModule,
		WorkspaceCommonModule,
	],
	controllers: [WorkspaceController],
	exports: [WorkspaceService],
	providers: [WorkspaceService],
})
export class WorkspaceModule {}
