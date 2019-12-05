import * as createError from "http-errors";
import { ObjectionTarget } from "../../shared/api/entities";
import { ObjectionEntity } from "../database/entities";

export const getObjectionTargetProperties = ({
  targetExerciseId,
  targetGroupId,
  targetPlaylistId,
  targetUserId
}: ObjectionEntity): {
  targetType: ObjectionTarget;
  targetId: string;
} => {
  if (targetExerciseId !== undefined) {
    return {
      targetType: "Exercise",
      targetId: targetExerciseId
    };
  } else if (targetGroupId !== undefined) {
    return {
      targetType: "Group",
      targetId: targetGroupId
    };
  } else if (targetPlaylistId !== undefined) {
    return {
      targetType: "Playlist",
      targetId: targetPlaylistId
    };
  } else if (targetUserId !== undefined) {
    return {
      targetType: "User",
      targetId: targetUserId
    };
  }

  throw createError(500, "objection.targetId is not defined");
};
