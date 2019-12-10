import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ObjectionTarget } from "../../shared/api/entities";
import { ExerciseEntity, ObjectionEntity, PlaylistEntity, UserEntity } from "../database/entities";

export const getObjectionTargetProperties = ({
  targetExerciseId,
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

export const unlockObjectionTarget = async (
  manager: EntityManager,
  { targetExerciseId, targetPlaylistId, targetUserId }: ObjectionEntity
) => {
  if (targetExerciseId !== undefined) {
    const targetExercise = await manager.findOne(ExerciseEntity, targetExerciseId);
    if (targetExercise === undefined) {
      throw createError(500);
    }

    targetExercise.isLocked = false;

    await manager.save(targetExercise);
  } else if (targetPlaylistId !== undefined) {
    const targetPlaylist = await manager.findOne(PlaylistEntity, targetPlaylistId);
    if (targetPlaylist === undefined) {
      throw createError(500);
    }

    targetPlaylist.isLocked = false;

    await manager.save(targetPlaylist);
  } else if (targetUserId !== undefined) {
    const targetUser = await manager.findOne(UserEntity, targetUserId);
    if (targetUser === undefined) {
      throw createError(400);
    }

    targetUser.permission = "Write";

    await manager.save(targetUser);
  } else {
    throw createError(500, "report.targetId is not defined");
  }
};
