import { Field, ObjectType } from '@nestjs/graphql';
import { ArmorType } from 'src/common/enums/armortype.enum';
import { StatsLvl } from 'src/common/enums/statslvl.enum';

@ObjectType()
export class Stats {
  @Field(() => StatsLvl, { nullable: true })
  statsLvl: StatsLvl;

  @Field({ nullable: true })
  hp: number;

  @Field({ nullable: true })
  fp: number;

  @Field({ nullable: true })
  trp: number;

  @Field({ nullable: true })
  avi: number;

  @Field({ nullable: true })
  aa: number;

  @Field({ nullable: true })
  rld: number;

  @Field({ nullable: true })
  eva: number;

  @Field(() => ArmorType, { nullable: true })
  armorType: ArmorType;

  @Field({ nullable: true })
  spd: number;

  @Field({ nullable: true })
  acc: number;

  @Field({ nullable: true })
  lck: number;

  @Field({ nullable: true })
  asw: number;

  @Field({ nullable: true })
  oil: number;
}
