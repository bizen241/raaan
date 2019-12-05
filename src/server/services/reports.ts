import * as createError from "http-errors";
import { ReportTarget } from "../../shared/api/entities";
import { ReportEntity } from "../database/entities";

export const getTargetProperties = ({
  targetExerciseId,
  targetGroupId,
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
