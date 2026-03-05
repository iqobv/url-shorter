import { Module } from '@nestjs/common';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { WorkspaceCommonModule } from '../workspace-common/workspace-common.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
	imports: [AuditLogModule, WorkspaceCommonModule],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
