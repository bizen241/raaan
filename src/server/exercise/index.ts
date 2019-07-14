export const normalizeTags = (tags: string[] = []) => {
  return [...new Set(tags)].filter(tag => tag.length > 0).slice(0, 5);
};
