import { EntityStore } from "../../../shared/api/response/get";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Exercise: { ...target.Exercise, ...source.Exercise },
  ExerciseSummary: { ...target.ExerciseSummary, ...source.ExerciseSummary },
  ExerciseTag: { ...target.ExerciseTag, ...source.ExerciseTag },
  Submission: { ...target.Submission, ...source.Submission },
  SubmissionSummary: { ...target.SubmissionSummary, ...source.SubmissionSummary },
  User: { ...target.User, ...source.User },
  UserDiary: { ...target.UserDiary, ...source.UserDiary },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserConfig: { ...target.UserConfig, ...source.UserConfig },
  UserSession: { ...target.UserSession, ...source.UserSession },
  UserSummary: { ...target.UserSummary, ...source.UserSummary }
});
