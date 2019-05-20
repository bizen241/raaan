import { EntityStore } from "../../../shared/api/response/get";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Exercise: { ...target.Exercise, ...source.Exercise },
  ExerciseDetail: { ...target.ExerciseDetail, ...source.ExerciseDetail },
  ExerciseRevision: { ...target.ExerciseRevision, ...source.ExerciseRevision },
  ExerciseRevisionDetail: { ...target.ExerciseRevisionDetail, ...source.ExerciseRevisionDetail },
  ExerciseSummary: { ...target.ExerciseSummary, ...source.ExerciseSummary },
  ExerciseTag: { ...target.ExerciseTag, ...source.ExerciseTag },
  User: { ...target.User, ...source.User },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserConfig: { ...target.UserConfig, ...source.UserConfig },
  UserSession: { ...target.UserSession, ...source.UserSession }
});
