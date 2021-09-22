import { Module } from '@nestjs/common';
import { ShipsResolver } from './ships.resolver';

@Module({
  providers: [ShipsResolver]
})
export class ShipsModule {}
