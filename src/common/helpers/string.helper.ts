export const toTitleCase = (s: string) =>
  s
    .split(' ')
    .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
    .join(' ');
