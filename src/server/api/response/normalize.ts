import { EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/get";
import {
  Entity,
  ExerciseDetailEntity,
  ExerciseEntity,
  ExerciseRevisionDetailEntity,
  ExerciseRevisionEntity,
  ExerciseTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
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
  const { id, authorId, author, detailId, detail, tags = [], isLocked, isPrivate } = entity;

  store.Exercise[id] = {
    ...base(entity),
    authorId,
    detailId,
    tagIds: tags.map(tag => tag.id),
    // from ExerciseSummaryEntity
    lang: "en",
    title: "",
    description: "",
    isLocked,
    isPrivate
  };

  normalizeEntity(store, author);
  normalizeEntity(store, detail);
};

const normalizeExerciseDetail: Normalizer<ExerciseDetailEntity> = (entity, store) => {
  const { id, lang, tags, title, description, rubric, questions, comment, navigationMode } = entity;

  store.ExerciseDetail[id] = {
    ...base(entity),
    lang,
    tags,
    title,
    description,
    rubric,
    questions,
    comment,
    navigationMode
  };
};

const normalizeExerciseRevision: Normalizer<ExerciseRevisionEntity> = (entity, store) => {
  const { id, exerciseId, exercise: content, detailId, detail } = entity;

  store.ExerciseRevision[id] = {
    ...base(entity),
    exerciseId,
    detailId
  };

  normalizeEntity(store, content);
  normalizeEntity(store, detail);
};

const normalizeExerciseRevisionDetail: Normalizer<ExerciseRevisionDetailEntity> = (entity, store) => {
  const { id, lang, tags, title, description, rubric, questions, comment, navigationMode } = entity;

  store.ExerciseDetail[id] = {
    ...base(entity),
    lang,
    tags,
    title,
    description,
    rubric,
    questions,
    comment,
    navigationMode
  };
};

const normalizeExerciseTag: Normalizer<ExerciseTagEntity> = (entity, store) => {
  const { id, name } = entity;

  store.ExerciseTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeUser: Normalizer<UserEntity> = (entity, store) => {
  const { id, name, permission, accountId, configId, config } = entity;

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

const normalizeUserSession: Normalizer<UserSessionEntity> = (entity, store) => {
  const { id, userAgent, userId, user } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId,
    userAgent
  };

  normalizeEntity(store, user);
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Exercise: normalizeExercise,
  ExerciseDetail: normalizeExerciseDetail,
  ExerciseRevision: normalizeExerciseRevision,
  ExerciseRevisionDetail: normalizeExerciseRevisionDetail,
  ExerciseTag: normalizeExerciseTag,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserSession: normalizeUserSession
};
