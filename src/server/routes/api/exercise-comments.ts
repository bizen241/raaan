import { getManager } from "typeorm";
import { createSearchOperation } from "../../api/operation";
import { ExerciseCommentEntity } from "../../database/entities";

export const GET = createSearchOperation("ExerciseComment", "Read", async ({ params }) => {
  const { targetId } = params;

  const query = getManager()
    .createQueryBuilder(ExerciseCommentEntity, "exerciseComment")
    .leftJoinAndSelect("exerciseComment.summary", "summary")
    .leftJoinAndSelect("exerciseComment.target", "target")
    .leftJoinAndSelect("exerciseComment.author", "author");

  if (targetId !== undefined) {
    query.andWhere("exerciseComment.targetId = :targetId", { targetId });
  }

  return query;
});
