import { PERMISSIONS } from '@libs/constants';
import { Authorized, Permissions } from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';

@ApiTags('Audit Logs')
@Controller('audit-logs')
export class AuditLogController {
	constructor(private readonly auditLogService: AuditLogService) {}

	@Permissions(PERMISSIONS.AUDIT_LOG.VIEW)
	@ApiOperation({ summary: 'Get audit logs for a workspace' })
	@Get(':workspaceId')
	async getAuditLogs(
		@Param('workspaceId') workspaceId: string,
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryDto,
	) {
		return await this.auditLogService.getAuditLogs(workspaceId, userId, query);
	}
}
