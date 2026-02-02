import { Module } from '@nestjs/common';
import { ReservedWordController } from './reserved-word.controller';
import { ReservedWordService } from './reserved-word.service';

@Module({
	controllers: [ReservedWordController],
	exports: [ReservedWordService],
	providers: [ReservedWordService],
})
export class ReservedWordModule {}
