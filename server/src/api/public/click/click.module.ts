import { Module } from '@nestjs/common';
import { ClickService } from './click.service';

@Module({
	exports: [ClickService],
	providers: [ClickService],
})
export class ClickModule {}
