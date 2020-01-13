import createError from "http-errors";
import { createDeleteOperation, createGetOperation, createPatchOperation } from "../../../api/operation";
import { hasPermission } from "../../../api/security";
import { ObjectionCommentEntity, ObjectionEntity } from "../../../database/entities";
import { unlockObjectionTarget } from "../../../services/objections";

export const GET = createGetOperation("Objection", "Read", async ({ manager, id }) => {
  const objection = await manager.findOne(ObjectionEntity, id, {
    relations: ["summary"]
  });
  if (objection === undefined) {
    throw createError(404);
  }

  return [objection];
});

export const PATCH = createPatchOperation("Objection", "Write", async ({ currentUser, manager, id, params }) => {
  const objection = await manager.findOne(ObjectionEntity, id);
  if (objection === undefined) {
    throw createError(404);
  }

  const isObjector = objection.objectorId === currentUser.id;
  if (!isObjector && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  if (isObjector) {
    if (params.description !== undefined) {
      objection.description = params.description;
    }
  } else {
    if (objection.state !== "accepted" && params.state === "accepted") {
      await unlockObjectionTarget(manager, objection);
    }

    if (params.state !== undefined) {
      objection.state = params.state;
    }
    if (params.comment !== undefined) {
      const objectionComment = new ObjectionCommentEntity(objection, currentUser, params.comment);
      await manager.save(objectionComment);
    }
  }

  await manager.save(objection);

  return [objection];
});

export const DELETE = createDeleteOperation("Objection", "Read", async ({ currentUser, manager, id }) => {
  const objection = await manager.findOne(ObjectionEntity, id);
  if (objection === undefined) {
    throw createError(404);
  }

  const isOwn = objection.objectorId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  await manager.remove(objection);

  return [];
});
