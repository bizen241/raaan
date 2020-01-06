import * as createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { ObjectionEntity } from "../../database/entities";
import { checkObjectionTarget } from "../../services/objections";

export const POST = createPostOperation("Objection", "Write", async ({ currentUser, manager, params }) => {
  const { targetType, targetId, description = "" } = params;
  if (targetType === undefined || targetId === undefined) {
    throw createError(400);
  }

  await checkObjectionTarget(manager, currentUser, targetType, targetId);

  const objection = new ObjectionEntity(currentUser, description);
  objection.targetType = targetType;
  objection.targetId = targetId;
  await manager.save(objection);

  return [objection];
});
