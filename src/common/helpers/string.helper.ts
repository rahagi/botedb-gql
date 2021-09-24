import { Rarity } from '../enums/rarity.enum';

export const toTitleCase = (s: string): string =>
  s
    .split(' ')
    .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
    .join(' ');

export const normalizeRarityNum = (n: string): string => {
  const rarityIndex = Number(n);
  if (isNaN(rarityIndex)) return 'Normal';
  const rarityMap = Object.values(Rarity);
  return rarityMap[Number(n) - 2];
};
