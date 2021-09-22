import { registerEnumType } from '@nestjs/graphql';

export enum SkillType {
  OFFENSIVE = 'Pink',
  SUPPORT = 'Gold',
  DEFENSIVE = 'DeepSkyBlue',
}

registerEnumType(SkillType, { name: 'SkillType' });
