import { Field, ObjectType } from '@nestjs/graphql';
import { Rarity } from 'src/common/enums/rarity.enum';
import { ShipType } from 'src/common/enums/shiptype.enum';
import { Illustrator } from './illustrator.entity ';
import { Skill } from './skill.entity';
import { Stats } from './stats.entity';
import { VoiceActor } from './voiceactor.entity';

@ObjectType()
export class Ship {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  artUrl: string;

  @Field({ nullable: true })
  artRetrofitUrl: string;

  @Field({ nullable: true })
  jpName: string; // 🇯🇵

  @Field({ nullable: true })
  westTwName: string; // 🇹🇼

  @Field({ nullable: true })
  fullName: string;

  @Field(() => ShipType, { nullable: true })
  shipType: ShipType;

  @Field(() => Rarity, { nullable: true })
  rarity: Rarity;

  @Field({ nullable: true })
  class: string;

  @Field({ nullable: true })
  faction: string;

  @Field(() => [Stats], { nullable: true })
  stats: [Stats];

  @Field(() => Skill, { nullable: true })
  skill: Skill;

  @Field(() => VoiceActor, { nullable: true })
  voiceActor: VoiceActor;

  @Field(() => Illustrator, { nullable: true })
  illustrator: Illustrator;
}
