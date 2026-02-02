import { Module } from '@nestjs/common';
import { ReservedWordModule } from 'src/api/public/reserved-word/reserved-word.module';
import { AdminReservedWordController } from './admin-reserved-word.controller';

@Module({
	controllers: [AdminReservedWordController],
	imports: [ReservedWordModule],
})
export class AdminReservedWordModule {}
