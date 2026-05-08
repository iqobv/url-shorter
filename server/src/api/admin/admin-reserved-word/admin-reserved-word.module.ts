import { ReservedWordModule } from '@api/public/reserved-word/reserved-word.module';
import { Module } from '@nestjs/common';
import { AdminReservedWordController } from './admin-reserved-word.controller';

@Module({
	controllers: [AdminReservedWordController],
	imports: [ReservedWordModule],
})
export class AdminReservedWordModule {}
