import { Module } from '@nestjs/common';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { WorkspaceCommonModule } from '../workspace-common/workspace-common.module';
import { WorkspaceMemberModule } from '../workspace-member/workspace-member.module';
import { InviteLinkController } from './invite-link.controller';
import { InviteLinkService } from './invite-link.service';

@Module({
	imports: [AuditLogModule, WorkspaceMemberModule, WorkspaceCommonModule],
	controllers: [InviteLinkController],
	providers: [InviteLinkService],
})
export class InviteLinkModule {}
