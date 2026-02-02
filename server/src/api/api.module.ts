import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

@Module({
	imports: [PublicModule, AdminModule],
})
export class ApiModule {}
