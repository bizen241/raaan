import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { ObjectionCommentEntity, ObjectionEntity } from "../../database/entities";

export const GET = createSearchOperation("ObjectionComment", "Read", async ({ manager, params }) => {
  const { targetId, authorId } = params;

  const query = manager
    .createQueryBuilder(ObjectionCommentEntity, "objectionComment")
    .leftJoinAndSelect("objectionComment.target", "target")
    .leftJoinAndSelect("objectionComment.author", "author")
    .leftJoinAndSelect("author.summary", "summary");

  if (targetId !== undefined) {
    query.andWhere("objectionComment.targetId = :targetId", { targetId });
  }
  if (authorId !== undefined) {
    query.andWhere("objectionComment.authorId = :authorId", { authorId });
  }

  return query;
});

export const POST = createPostOperation("ObjectionComment", "Write", async ({ currentUser, manager, params }) => {
  const { targetId, body = "" } = params;

  const target = await manager.findOne(ObjectionEntity, targetId);
  if (target === undefined) {
    throw createError(404);
  }

  const objectionComment = new ObjectionCommentEntity(target, currentUser, body);
  await manager.save(objectionComment);

  return [objectionComment];
});
