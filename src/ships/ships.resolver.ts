import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Illustrator } from './entities/illustrator.entity ';
import { Ship } from './entities/ship.entity';
import { Skill } from './entities/skill.entity';
import { Stats } from './entities/stats.entity';
import { VoiceActor } from './entities/voiceactor.entity';
import { ShipsService } from './ships.service';

@Resolver(() => Ship)
export class ShipsResolver {
  constructor(private readonly shipService: ShipsService) {}

  @Query(() => Ship)
  async ship(@Args('name') name: string): Promise<Ship> {
    return this.shipService.getBaseShip(name);
  }

  @Query(() => [Ship])
  async ships(): Promise<Ship[]> {
    return this.shipService.getShips();
  }

  @ResolveField(() => Stats)
  async stats(@Parent() ship: Ship): Promise<Stats[]> {
    return this.shipService.getStats(ship);
  }

  @ResolveField(() => Skill)
  async skills(@Parent() ship: Ship): Promise<Skill[]> {
    return this.shipService.getSkills(ship);
  }

  @ResolveField(() => Illustrator)
  async illustrator(@Parent() ship: Ship): Promise<Illustrator> {
    return this.shipService.getIllustrator(ship);
  }

  @ResolveField(() => VoiceActor)
  async voiceActor(@Parent() ship: Ship): Promise<VoiceActor> {
    return this.shipService.getVoiceActor(ship);
  }
}
