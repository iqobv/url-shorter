import { Module } from '@nestjs/common';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [WorkspaceModule],
	providers: [UserService],
})
export class UserModule {}
