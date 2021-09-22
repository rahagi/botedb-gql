import { registerEnumType } from '@nestjs/graphql';

export enum StatsLvl {
  BASE = 'Base',
  _100 = 'Level 100',
  _100_RETROFIT = 'Level 100 Retrofit',
  _120 = 'Level 120',
  _120_RETROFIT = 'Level 120 Retrofit',
}

registerEnumType(StatsLvl, { name: 'StatsLvl' });
