import { createSearchOperation } from "../../api/operation";
import { TagDiaryEntryEntity } from "../../database/entities";

export const GET = createSearchOperation("TagDiaryEntry", "Read", async ({ manager, params }) => {
  const { tagId } = params;

  const query = manager.createQueryBuilder(TagDiaryEntryEntity, "tagDiaryEntry").orderBy("tagDiaryEntry.date", "DESC");

  if (tagId !== undefined) {
    query.andWhere("tag.id = :tagId", { tagId });
  }

  return query;
});
