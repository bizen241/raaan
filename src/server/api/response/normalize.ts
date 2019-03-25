import { EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/get";
import {
  ExerciseDetailEntity,
  ExerciseEntity,
  ExerciseRevisionEntity,
  ExerciseTagEntity,
  Entity,
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

const isId = (target: any): target is string => typeof target === "string";
const getId = (target: Entity | string) => (isId(target) ? target : target.id);

const normalizeEntity = (store: EntityStore, entity: Entity | string) => {
  if (isId(entity)) {
    return;
  }

  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }

  normalizers[type](entity, store);
};

const base = <T extends EntityType>({ id, createdAt, updatedAt }: BaseEntityClass<T>): BaseEntityObject => ({
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (entity: E, store: EntityStore) => void;

const normalizeExercise: Normalizer<ExerciseEntity> = (entity, store) => {
  const { id, author, detail, tags, lang, title, description, isLocked, isPrivate } = entity;

  store.Exercise[id] = {
    ...base(entity),
    authorId: getId(author),
    detailId: getId(detail),
    tagIds: tags.map(tag => getId(tag)),
    lang,
    title,
    description,
    isLocked,
    isPrivate
  };

  normalizeEntity(store, author);
  normalizeEntity(store, detail);
};

const normalizeExerciseDetail: Normalizer<ExerciseDetailEntity> = (entity, store) => {
  const { id, lang, tags, title, description, rubric, items, comment, navigationMode } = entity;

  store.ExerciseDetail[id] = {
    ...base(entity),
    lang,
    tags,
    title,
    description,
    rubric,
    items,
    comment,
    navigationMode
  };
};

const normalizeExerciseRevision: Normalizer<ExerciseRevisionEntity> = (entity, store) => {
  const { id, content, detail } = entity;

  store.ExerciseRevision[id] = {
    ...base(entity),
    contentId: getId(content),
    detailId: getId(detail)
  };

  normalizeEntity(store, content);
  normalizeEntity(store, detail);
};

const normalizeExerciseTag: Normalizer<ExerciseTagEntity> = (entity, store) => {
  const { id, name } = entity;

  store.ExerciseTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeUser: Normalizer<UserEntity> = (entity, store) => {
  const { id, name, permission, config } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    configId: getId(config)
  };

  normalizeEntity(store, config);
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (entity, store) => {
  const { id, provider, accountId, user } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    accountId,
    provider,
    userId: getId(user)
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
  const { id, userAgent, user } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId: user.id,
    userAgent
  };

  normalizeEntity(store, user);
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Exercise: normalizeExercise,
  ExerciseDetail: normalizeExerciseDetail,
  ExerciseRevision: normalizeExerciseRevision,
  ExerciseTag: normalizeExerciseTag,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserSession: normalizeUserSession
};
