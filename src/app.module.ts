import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    ShipsModule,
  ],
})
export class AppModule {}
