import { Tag } from "../../shared/api/entities";

export const normalizeTags = (tags: Tag[] = []) => {
  const tagNames = tags.map(tag => tag.name);

  return [...new Set(tagNames)].filter(tagName => tagName.length > 0).slice(0, 5);
};
