export const categories = [ "Horror", "Open world",] as const;
export type categoryType = typeof categories[number] | '';