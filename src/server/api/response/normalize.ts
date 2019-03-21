import { EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/get";
import {
  ContentEntity,
  ContentRevisionEntity,
  ContentTagEntity,
  Entity,
  UserAccountEntity,
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

const normalizeContent: Normalizer<ContentEntity> = (entity, store) => {
  const { id, author, latest, isLocked, isPrivate } = entity;

  store.Content[id] = {
    ...base(entity),
    authorId: getId(author),
    latestId: getId(latest),
    tagIds: [],
    lang: "",
    title: "",
    description: "",
    isLocked,
    isPrivate
  };

  normalizeEntity(store, author);
  normalizeEntity(store, latest);
};

const normalizeContentRevision: Normalizer<ContentRevisionEntity> = (entity, store) => {
  const { id, content, lang, tags, title, summary, comment, items, isLinear } = entity;

  store.ContentRevision[id] = {
    ...base(entity),
    contentId: getId(content),
    lang,
    tags,
    title,
    summary,
    comment,
    items,
    isLinear
  };

  normalizeEntity(store, content);
};

const normalizeContentTag: Normalizer<ContentTagEntity> = (entity, store) => {
  const { id, name } = entity;

  store.ContentTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeUser: Normalizer<UserEntity> = (entity, store) => {
  const { id, name, permission /* detail */ } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission
    // detailId: getId(id);
  };

  // normalizeEntity(store, detail);
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
  Content: normalizeContent,
  ContentRevision: normalizeContentRevision,
  ContentTag: normalizeContentTag,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserSession: normalizeUserSession
};
