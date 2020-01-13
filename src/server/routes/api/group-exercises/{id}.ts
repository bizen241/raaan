import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { GroupExerciseEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("GroupExercise", "Read", async ({ manager, id }) => {
  const groupExercise = await manager.findOne(GroupExerciseEntity, id);
  if (groupExercise === undefined) {
    throw createError(404);
  }

  await manager.remove(groupExercise);

  return [];
});
