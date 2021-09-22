import { registerEnumType } from '@nestjs/graphql';

export enum Rarity {
  N = 'Normal',
  R = 'Rare',
  SR = 'Elite',
  SSR = 'Super Rare',
  UR = 'Ultra Rare',
  PR = 'Priority',
  DR = 'Decisive',
}

registerEnumType(Rarity, { name: 'Rarity' });
