export const getFullSizeArt = (s: string) =>
  s.replace(/thumb\//, '').replace(/\/\d+px-.*.png/, '');
