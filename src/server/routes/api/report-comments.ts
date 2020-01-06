import { createSearchOperation } from "../../api/operation";
import { ReportCommentEntity } from "../../database/entities";

export const GET = createSearchOperation("ReportComment", "Read", async ({ manager, params }) => {
  const { targetId, authorId } = params;

  const query = manager
    .createQueryBuilder(ReportCommentEntity, "reportComment")
    .leftJoinAndSelect("reportComment.target", "target")
    .leftJoinAndSelect("reportComment.author", "author")
    .leftJoinAndSelect("author.summary", "summary");

  if (targetId !== undefined) {
    query.andWhere("reportComment.targetId = :targetId", { targetId });
  }
  if (authorId !== undefined) {
    query.andWhere("reportComment.authorId = :authorId", { authorId });
  }

  return query;
});
