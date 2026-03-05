import { Module } from '@nestjs/common';
import { WorkspaceCommonService } from './workspace-common.service';

@Module({
	providers: [WorkspaceCommonService],
	exports: [WorkspaceCommonService],
})
export class WorkspaceCommonModule {}
