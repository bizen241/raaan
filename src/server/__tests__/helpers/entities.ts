import { getManager } from "typeorm";
import uuid from "uuid/v4";
import { ExerciseContent, Permission } from "../../../shared/api/entities";
import {
  ContestEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  GroupEntity,
  GroupSecretEntity,
  GroupSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";

export const insertContest = async (
  params: {
    contestGroup?: GroupEntity;
    contestExercise?: ExerciseEntity;
    contestTitle?: string;
  } = {}
) => {
  const manager = getManager();

  const { group } = await insertGroup();
  const { exercise } = await insertExercise();

  const contestGroup = params.contestGroup || group;
  const contestExercise = params.contestExercise || exercise;
  const contestTitle = params.contestTitle || "";
  const contestStartAt = new Date();
  const contestFinishAt = new Date(Date.now() + 1000 * 60 * 60);

  const contest = new ContestEntity(contestGroup, contestExercise, contestTitle, contestStartAt, contestFinishAt);
  await manager.save(contest);

  return contest;
};

export const insertGroup = async (
  params: {
    groupOwner?: UserEntity;
    groupOwnerPermission?: Permission;
    groupName?: string;
    groupSecretValue?: string;
  } = {}
) => {
  const manager = getManager();

  const groupOwnerPermission = params.groupOwnerPermission || "Read";

  const { user } = await insertUser({
    userPermission: groupOwnerPermission
  });

  const groupSecretValue = params.groupSecretValue || uuid();
  const groupOwner = params.groupOwner || user;
  const groupName = params.groupName || "";

  const groupSummary = new GroupSummaryEntity();
  const groupSecret = new GroupSecretEntity(groupSecretValue, new Date());
  const group = new GroupEntity(groupOwner, groupSummary, groupSecret, groupName);
  await manager.save(group);

  return { group };
};

export const insertUser = async (
  params: {
    userPermission?: Permission;
  } = {}
) => {
  const manager = getManager();

  const userPermission = params.userPermission || "Write";

  const account = new UserAccountEntity("github", uuid(), uuid());
  const config = new UserConfigEntity();
  const summary = new UserSummaryEntity();
  const user = await manager.save(new UserEntity(account, config, summary, userPermission, userPermission));

  return { account, config, user };
};

export const insertSession = async (
  params: {
    sessionUser?: UserEntity;
  } = {}
) => {
  const manager = getManager();

  const { user } = await insertUser();

  const sessionUser = params.sessionUser || user;

  const session = new UserSessionEntity(sessionUser, uuid());
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

export const insertExercise = async (
  params: {
    exerciseAuthor?: UserEntity;
  } = {}
) => {
  const manager = getManager();

  const { user } = await insertUser({
    userPermission: "Write"
  });

  const exerciseAuthor = params.exerciseAuthor || user;

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

  const exerciseSummary = new ExerciseSummaryEntity(exerciseContent);
  exerciseSummary.maxTypeCount = 0;
  exerciseSummary.minTypeCount = 0;
  exerciseSummary.tags = [];

  const exerciseDraft = new ExerciseDraftEntity(exerciseContent);
  exerciseDraft.isMerged = isMerged;

  const exercise = new ExerciseEntity(exerciseSummary, exerciseAuthor, exerciseDraft);
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
