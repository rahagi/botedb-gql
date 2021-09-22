import { Module } from '@nestjs/common';
import { ShipsResolver } from './ships.resolver';
import { ShipsService } from './ships.service';

@Module({
  providers: [ShipsResolver, ShipsService],
})
export class ShipsModule {}
