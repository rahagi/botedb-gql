import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ShipsModule } from './ships/ships.module';
import { CrawlerModule } from './crawler/crawler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ShipsModule,
    CrawlerModule,
  ],
})
export class AppModule {}
