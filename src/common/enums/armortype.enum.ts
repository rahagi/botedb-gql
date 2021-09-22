import { registerEnumType } from '@nestjs/graphql';

export enum ArmorType {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  HEAVY = 'Heavy',
}

registerEnumType(ArmorType, { name: 'ArmorType' });
