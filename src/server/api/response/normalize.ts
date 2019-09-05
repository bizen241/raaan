import { createEntityTypeToObject, EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { EntityStore } from "../../../shared/api/response/get";
import {
  Entity,
  ExerciseDiaryEntity,
  ExerciseEntity,
  ExerciseReportEntity,
  ExerciseSummaryEntity,
  ExerciseTagEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";
import { BaseEntityClass } from "../../database/entities/BaseEntityClass";
import { ExerciseVoteEntity } from "../../database/entities/ExerciseVoteEntity";
import { UserDiaryEntity } from "../../database/entities/UserDiaryEntity";

export interface RequestContext {
  sessionId?: string;
}

export const normalizeEntities = (context: RequestContext, entities: Entity[]): EntityStore => {
  const store: EntityStore = createEntityTypeToObject();

  entities.forEach(entity => {
    normalizeEntity(context, store, entity);
  });

  return store;
};

const normalizeEntity = (context: RequestContext, store: EntityStore, entity: Entity | undefined) => {
  if (entity === undefined) {
    return;
  }

  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }

  normalizers[type](context, store, entity);
};

const base = ({ id, createdAt, updatedAt }: BaseEntityClass): BaseEntityObject => ({
  id,
  createdAt: createdAt.getTime(),
  updatedAt: updatedAt.getTime(),
  fetchedAt: new Date().getTime()
});

type Normalizer<E> = (context: RequestContext, store: EntityStore, entity: E) => void;

const normalizeExercise: Normalizer<ExerciseEntity> = (context, store, entity) => {
  const {
    id,
    author,
    authorId,
    summary,
    summaryId,
    lang,
    title,
    tags,
    description,
    rubric,
    comment,
    questions,
    isLocked,
    isPrivate
  } = entity;

  store.Exercise[id] = {
    ...base(entity),
    authorId,
    summaryId,
    lang,
    title,
    tags,
    description,
    rubric,
    comment,
    questions,
    isLocked,
    isPrivate
  };

  normalizeEntity(context, store, author);
  normalizeEntity(context, store, summary);
};

const normalizeExerciseDiary: Normalizer<ExerciseDiaryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.ExerciseDiary[id] = {
    ...base(entity),
    date: date.getTime(),
    submittedCount,
    typedCount
  };
};

const normalizeExerciseReport: Normalizer<ExerciseReportEntity> = (_, store, entity) => {
  const { id, targetId, reporterId } = entity;

  store.ExerciseReport[id] = {
    ...base(entity),
    targetId,
    reporterId
  };
};

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (context, store, entity) => {
  const { id, exercise, exerciseId, tags = [], upvoteCount, submittedCount: submitCount } = entity;
  if (exercise === undefined) {
    return;
  }

  const { author, authorId, lang, title, description } = exercise;

  store.ExerciseSummary[id] = {
    ...base(entity),
    authorId,
    exerciseId,
    lang,
    title,
    tags: tags.map(tag => tag.name).join(" "),
    description,
    upvoteCount,
    submitCount
  };

  normalizeEntity(context, store, author);
};

const normalizeExerciseTag: Normalizer<ExerciseTagEntity> = (_, store, entity) => {
  const { id, name } = entity;

  store.ExerciseTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeExerciseVote: Normalizer<ExerciseVoteEntity> = (_, store, entity) => {
  const { id, targetId, voterId, isUp } = entity;

  store.ExerciseVote[id] = {
    ...base(entity),
    targetId,
    voterId,
    isUp
  };
};

const normalizeSubmission: Normalizer<SubmissionEntity> = (_, store, entity) => {
  const { id, submitterId, exerciseId, typeCount, time, accuracy, finishedAt } = entity;

  store.Submission[id] = {
    ...base(entity),
    submitterId,
    exerciseId,
    typeCount,
    time,
    accuracy,
    finishedAt: finishedAt.getTime()
  };
};

const normalizeSubmissionSummary: Normalizer<SubmissionSummaryEntity> = (context, store, entity) => {
  const { id, submitterId, exerciseId, exercise, latest, submitCount, typeCount } = entity;
  if (exercise === undefined || exercise.summary === undefined || latest === undefined) {
    return;
  }

  store.SubmissionSummary[id] = {
    ...base(entity),
    submitterId,
    exerciseId,
    exerciseSummaryId: exercise.summaryId,
    latest: {
      typeCount: latest.typeCount,
      time: latest.time,
      accuracy: latest.accuracy,
      finishedAt: latest.finishedAt.getTime()
    },
    submitCount,
    typeCount
  };

  normalizeEntity(context, store, exercise.summary);
};

const normalizeUser: Normalizer<UserEntity> = (context, store, entity) => {
  const { id, account, accountId, config, configId, summary, summaryId, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    accountId,
    configId,
    summaryId
  };

  normalizeEntity(context, store, account);
  normalizeEntity(context, store, config);
  normalizeEntity(context, store, summary);
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (context, store, entity) => {
  const { id, user, provider, accountId, email } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    provider,
    accountId,
    email
  };

  normalizeEntity(context, store, user);
};

const normalizeUserConfig: Normalizer<UserConfigEntity> = (_, store, entity) => {
  const { id, lang, theme } = entity;

  store.UserConfig[id] = {
    ...base(entity),
    lang,
    theme
  };
};

const normalizeUserDiary: Normalizer<UserDiaryEntity> = (_, store, entity) => {
  const { id, date, submitCount, typeCount, submittedCount, typedCount, createCount, editCount } = entity;

  store.UserDiary[id] = {
    ...base(entity),
    date,
    submitCount,
    typeCount,
    submittedCount,
    typedCount,
    createCount,
    editCount
  };
};

const normalizeUserSession: Normalizer<UserSessionEntity> = (context, store, entity) => {
  const { id, user, userId, accessCount, deviceType, deviceName, os, browser } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId,
    accessCount,
    deviceType,
    deviceName,
    os,
    browser,
    isCurrent: entity.sessionId === context.sessionId
  };

  normalizeEntity(context, store, user);
};

const normalizeUserSummary: Normalizer<UserSummaryEntity> = (_, store, entity) => {
  const { id, userId, submitCount, typeCount } = entity;

  store.UserSummary[id] = {
    ...base(entity),
    userId,
    submitCount,
    typeCount
  };
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Exercise: normalizeExercise,
  ExerciseDiary: normalizeExerciseDiary,
  ExerciseReport: normalizeExerciseReport,
  ExerciseSummary: normalizeExerciseSummary,
  ExerciseTag: normalizeExerciseTag,
  ExerciseVote: normalizeExerciseVote,
  Submission: normalizeSubmission,
  SubmissionSummary: normalizeSubmissionSummary,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserDiary: normalizeUserDiary,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
