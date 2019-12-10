import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ReportTarget } from "../../shared/api/entities";
import { ExerciseEntity, PlaylistEntity, ReportEntity, UserEntity } from "../database/entities";

export const getReportTargetProperties = ({
  targetExerciseId,
  targetPlaylistId,
  targetSynonymId,
  targetTagId,
  targetUserId
}: ReportEntity): {
  targetType: ReportTarget;
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
  } else if (targetSynonymId !== undefined) {
    return {
      targetType: "Synonym",
      targetId: targetSynonymId
    };
  } else if (targetTagId !== undefined) {
    return {
      targetType: "Tag",
      targetId: targetTagId
    };
  } else if (targetUserId !== undefined) {
    return {
      targetType: "User",
      targetId: targetUserId
    };
  }

  throw createError(500, "report.targetId is not defined");
};

export const lockReportTarget = async (
  manager: EntityManager,
  { targetExerciseId, targetPlaylistId, targetUserId }: ReportEntity
) => {
  if (targetExerciseId !== undefined) {
    const targetExercise = await manager.findOne(ExerciseEntity, targetExerciseId);
    if (targetExercise === undefined) {
      throw createError(500);
    }

    targetExercise.isPrivate = true;
    targetExercise.isLocked = true;

    await manager.save(targetExercise);
  } else if (targetPlaylistId !== undefined) {
    const targetPlaylist = await manager.findOne(PlaylistEntity, targetPlaylistId);
    if (targetPlaylist === undefined) {
      throw createError(500);
    }

    targetPlaylist.isPrivate = true;
    targetPlaylist.isLocked = true;

    await manager.save(targetPlaylist);
  } else if (targetUserId !== undefined) {
    const targetUser = await manager.findOne(UserEntity, targetUserId);
    if (targetUser === undefined) {
      throw createError(400);
    }

    targetUser.permission = "Read";

    await manager.save(targetUser);
  } else {
    throw createError(500, "report.targetId is not defined");
  }
};
