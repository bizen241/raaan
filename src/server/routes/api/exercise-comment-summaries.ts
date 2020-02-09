import { getManager } from "typeorm";
import { createSearchOperation } from "../../api/operation";
import { ExerciseCommentSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("ExerciseCommentSummary", "Guest", async ({ params }) => {
  const { parentId, authorId } = params;

  const query = getManager()
    .createQueryBuilder(ExerciseCommentSummaryEntity, "exerciseCommentSummary")
    .leftJoinAndSelect("exerciseCommentSummary.parent", "parent")
    .leftJoinAndSelect("parent.target", "target")
    .leftJoinAndSelect("parent.author", "author");

  if (parentId !== undefined) {
    query.andWhere("exerciseCommentSummary.parentId = :parentId", { parentId });
  }
  if (authorId !== undefined) {
    query.andWhere("parent.authorId = :authorId", { authorId });
  }

  return query;
});
