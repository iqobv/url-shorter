import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { ClickModule } from './click/click.module';
import { InviteLinkModule } from './invite-link/invite-link.module';
import { LinkModule } from './link/link.module';
import { RedirectModule } from './redirect/redirect.module';
import { ReservedWordModule } from './reserved-word/reserved-word.module';
import { RoleModule } from './role/role.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceMemberModule } from './workspace-member/workspace-member.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { WorkspaceCommonModule } from './workspace-common/workspace-common.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		TokenModule,
		LinkModule,
		ClickModule,
		AnalyticsModule,
		UserProviderModule,
		ReservedWordModule,
		RedirectModule,
		WorkspaceModule,
		RoleModule,
		InviteLinkModule,
		WorkspaceMemberModule,
		AuditLogModule,
		WorkspaceCommonModule,
	],
})
export class PublicModule {}
