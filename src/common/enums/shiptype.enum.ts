import { registerEnumType } from '@nestjs/graphql';

export enum ShipType {
  STANDARD = 'Standard',
  RESEARCH = 'Research',
  META = 'META',
  COLLAB = 'Collab',
}

registerEnumType(ShipType, { name: 'ShipType' });
