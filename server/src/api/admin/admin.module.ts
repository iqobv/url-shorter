import { Module } from '@nestjs/common';
import { AdminReservedWordModule } from './admin-reserved-word/admin-reserved-word.module';

@Module({
	imports: [AdminReservedWordModule],
})
export class AdminModule {}
