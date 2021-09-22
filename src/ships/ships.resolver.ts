import { Resolver, Query } from '@nestjs/graphql';
import { Ship } from './models/ship.model';

@Resolver()
export class ShipsResolver {
  @Query(() => Ship)
  ship(): any {
    return {
      id: 1,
    };
  }
}
