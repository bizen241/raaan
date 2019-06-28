import { EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/get";
import {
  Entity,
  ExerciseEntity,
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

export interface RequestContext {
  sessionId?: string;
}

export const normalizeEntities = (context: RequestContext, entities: Entity[]): EntityStore => {
  const store = createEntityStore();

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
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
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

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (context, store, entity) => {
  const { id, exercise, exerciseId, tags = [], submitCount } = entity;
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
    tags: tags.map(tag => tag.name).join(","),
    description,
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

const normalizeSubmission: Normalizer<SubmissionEntity> = (_, store, entity) => {
  const { id, userId, exerciseId, typeCount, time, accuracy } = entity;

  store.Submission[id] = {
    ...base(entity),
    userId,
    exerciseId,
    typeCount,
    time,
    accuracy
  };
};

const normalizeSubmissionSummary: Normalizer<SubmissionSummaryEntity> = (context, store, entity) => {
  const { id, userId, exerciseId, exercise, latest, best, submitCount } = entity;
  if (exercise === undefined || exercise.summary === undefined || latest === undefined || best === undefined) {
    return;
  }

  store.SubmissionSummary[id] = {
    ...base(entity),
    userId,
    exerciseId,
    exerciseSummaryId: exercise.summaryId,
    latest: {
      typeCount: latest.typeCount,
      time: latest.time,
      accuracy: latest.accuracy
    },
    best: {
      typeCount: best.typeCount,
      time: best.time,
      accuracy: best.accuracy
    },
    submitCount
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
  ExerciseSummary: normalizeExerciseSummary,
  ExerciseTag: normalizeExerciseTag,
  Submission: normalizeSubmission,
  SubmissionSummary: normalizeSubmissionSummary,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
