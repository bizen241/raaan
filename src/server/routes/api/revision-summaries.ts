import { createSearchOperation } from "../../api/operation";
import { RevisionSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("RevisionSummary", "Read", async ({ manager, params }) => {
  const { exerciseId, searchSort = "createdAt", searchOrder } = params;

  const query = manager
    .createQueryBuilder(RevisionSummaryEntity, "revisionSummary")
    .leftJoinAndSelect("revisionSummary.revision", "revision")
    .leftJoinAndSelect("revision.exercise", "exercise")
    .orderBy(`revision.${searchSort}`, searchOrder);

  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  return query;
});
