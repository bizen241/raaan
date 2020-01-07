import { createSearchOperation } from "../../api/operation";
import { AppDiaryEntryEntity } from "../../database/entities";

export const GET = createSearchOperation("AppDiaryEntry", "Read", async ({ manager }) => {
  const query = manager.createQueryBuilder(AppDiaryEntryEntity, "appDiaryEntry").orderBy("appDiaryEntry.date", "DESC");

  return query;
});
