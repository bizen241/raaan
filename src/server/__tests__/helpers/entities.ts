import { getManager } from "typeorm";
import uuid from "uuid/v4";
import { ExerciseContent, Permission } from "../../../shared/api/entities";
import {
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";

export const insertUser = async (permission: Permission) => {
  const manager = getManager();

  const account = new UserAccountEntity("github", uuid(), uuid());
  const config = new UserConfigEntity();
  const summary = new UserSummaryEntity();
  const user = await manager.save(new UserEntity(account, config, summary, permission, permission));

  return { account, config, user };
};

export const insertSession = async (user: UserEntity) => {
  const manager = getManager();

  const session = new UserSessionEntity(user, uuid());
  session.data = {
    cookie: {
      path: "/",
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      sameSite: "strict",
      secure: false
    },
    passport: {
      user: user.id
    }
  };

  await manager.save(session);

  return session;
};

export const insertExercise = async (user: UserEntity) => {
  const manager = getManager();

  const exerciseContent: ExerciseContent = {
    lang: "en",
    title: "",
    tags: [],
    description: "",
    questions: [],
    references: [],
    isRandom: true
  };

  const isMerged = true;
  const isPrivate = false;

  const exerciseSummary = new ExerciseSummaryEntity();
  exerciseSummary.maxTypeCount = 0;
  exerciseSummary.minTypeCount = 0;
  exerciseSummary.tags = [];

  const exerciseDraft = new ExerciseDraftEntity(exerciseContent);
  exerciseDraft.isMerged = isMerged;

  const exercise = new ExerciseEntity(exerciseSummary, user, exerciseDraft);
  exercise.isDraft = !isMerged;
  exercise.isPrivate = isPrivate;
  await manager.save(exercise);

  const revisionSummary = new RevisionSummaryEntity();
  const revision = new RevisionEntity(revisionSummary, exercise, exerciseContent, "", "", isPrivate);
  await manager.save(revision);

  exercise.latest = revision;

  await manager.save(exercise);

  return { exercise, exerciseSummary };
};
