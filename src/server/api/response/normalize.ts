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
  UserDiaryEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";
import { BaseEntityClass } from "../../database/entities/BaseEntityClass";

export const normalizeEntities = (entities: Entity[]): EntityStore => {
  const store = createEntityStore();

  entities.forEach(entity => {
    normalizeEntity(store, entity);
  });

  return store;
};

const normalizeEntity = (store: EntityStore, entity: Entity | undefined) => {
  if (entity === undefined) {
    return;
  }

  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }

  normalizers[type](entity, store);
};

const base = ({ id, createdAt, updatedAt }: BaseEntityClass): BaseEntityObject => ({
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (entity: E, store: EntityStore) => void;

const normalizeExercise: Normalizer<ExerciseEntity> = (entity, store) => {
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

  normalizeEntity(store, author);
  normalizeEntity(store, summary);
};

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (entity, store) => {
  const { id, exercise, exerciseId, tags } = entity;
  if (exercise === undefined || tags === undefined) {
    return;
  }

  const { author, authorId, lang, title, description } = exercise;

  store.ExerciseSummary[id] = {
    ...base(entity),
    authorId,
    exerciseId,
    tagIds: tags.map(tag => tag.id),
    lang,
    title,
    tags: tags.map(tag => tag.name).join(","),
    description
  };

  normalizeEntity(store, author);
};

const normalizeExerciseTag: Normalizer<ExerciseTagEntity> = (entity, store) => {
  const { id, name } = entity;

  store.ExerciseTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeSubmission: Normalizer<SubmissionEntity> = (entity, store) => {
  const { id, userId, exerciseId, keystrokes, time, accuracy } = entity;

  store.Submission[id] = {
    ...base(entity),
    userId,
    exerciseId,
    keystrokes,
    time,
    accuracy
  };
};

const normalizeSubmissionSummary: Normalizer<SubmissionSummaryEntity> = (entity, store) => {
  const { id, userId, exerciseId, latest, best, playCount } = entity;
  if (latest === undefined || best === undefined) {
    return;
  }

  store.SubmissionSummary[id] = {
    ...base(entity),
    userId,
    exerciseId,
    latest: {
      keystrokes: latest.keystrokes,
      time: latest.time,
      accuracy: latest.accuracy
    },
    best: {
      keystrokes: best.keystrokes,
      time: best.time,
      accuracy: best.accuracy
    },
    playCount
  };
};

const normalizeUser: Normalizer<UserEntity> = (entity, store) => {
  const { id, accountId, config, configId, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    accountId,
    configId
  };

  normalizeEntity(store, config);
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (entity, store) => {
  const { id, user, provider, accountId, email } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    provider,
    accountId,
    email
  };

  normalizeEntity(store, user);
};

const normalizeUserConfig: Normalizer<UserConfigEntity> = (entity, store) => {
  const { id, lang, theme } = entity;

  store.UserConfig[id] = {
    ...base(entity),
    lang,
    theme
  };
};

const normalizeUserDiary: Normalizer<UserDiaryEntity> = (entity, store) => {
  const { id, userId, date, playCount } = entity;

  store.UserDiary[id] = {
    ...base(entity),
    userId,
    date: date.toString(),
    playCount
  };
};

const normalizeUserSession: Normalizer<UserSessionEntity> = (entity, store) => {
  const { id, user, userId, userAgent } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId,
    userAgent
  };

  normalizeEntity(store, user);
};

const normalizeUserSummary: Normalizer<UserSummaryEntity> = (entity, store) => {
  const { id, userId, playCount } = entity;

  store.UserSummary[id] = {
    ...base(entity),
    userId,
    playCount
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
  UserDiary: normalizeUserDiary,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
