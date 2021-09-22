import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Ship } from './entities/ship.entity';
import { Skill } from './entities/skill.entity';
import { Stats } from './entities/stats.entity';

@Resolver(() => Ship)
export class ShipsResolver {
  @Query(() => Ship)
  ship(@Args('name') name: string): any {
    return {
      name,
      rarity: 'Ultra Rare',
      shipType: 'Standard',
    };
  }

  @ResolveField(() => Stats)
  stats(@Parent() ship: Ship): any {
    console.log(ship);
    return [
      {
        statsLvl: 'Level 120',
        hp: 1000,
        fp: 200,
        trp: 400,
        armorType: 'Light',
      },
    ];
  }

  @ResolveField(() => Skill)
  skill(@Parent() ship: Skill): any {
    console.log(ship);
    return {
      skillType: 'Pink',
    };
  }
}
