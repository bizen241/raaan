import { EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/entity";
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
import { ContentObjectEntity } from "../../database/entities/ContentObjectEntity";

export const normalizeEntities = (entities: Entity[], isSearching: boolean): EntityStore => {
  const store = createEntityStore();

  entities.forEach(entity => {
    normalizeEntity(store, entity, isSearching);
  });

  return store;
};

const normalizeEntity = (store: EntityStore, entity: Entity, isSearching: boolean) => {
  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }
  if (Object.keys(entity).length <= 2) {
    return;
  }

  normalizers[type](store, entity, isSearching);
};

const base = <T extends EntityType>({ id, createdAt, updatedAt }: BaseEntityClass<T>): BaseEntityObject => ({
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (store: EntityStore, entity: E, isSearching: boolean) => void;

const normalizeContent: Normalizer<ContentEntity> = (store, entity, isSearching) => {
  const { id, owner, latest, tags, isPrivate, isArchived, isLocked } = entity;

  store.Content[id] = {
    ...base(entity),
    ownerId: owner.id,
    latestId: latest.id,
    tagIds: tags.map(tag => tag.id),
    lang: latest.object.lang,
    title: latest.object.title,
    summary: latest.object.summary,
    isPrivate,
    isArchived,
    isLocked
  };

  tags.forEach(tag => normalizeEntity(store, tag, isSearching));
};

const normalizeContentRevision: Normalizer<ContentRevisionEntity> = (store, entity) => {
  const { id, content, parent, author, object, version, title, comment, isProposed, isMerged } = entity;

  store.ContentRevision[id] = {
    ...base(entity),
    contentId: content.id,
    parentId: parent.id,
    authorId: author.id,
    objectId: object.id,
    version,
    title,
    comment,
    isProposed,
    isMerged
  };
};

const normalizeContentObject: Normalizer<ContentObjectEntity> = (store, entity) => {
  const { id, lang, title, tags, summary, comment, items, isLinear } = entity;

  store.ContentObject[id] = {
    ...base(entity),
    lang,
    title,
    tags,
    summary,
    comment,
    items,
    isLinear
  };
};

const normalizeContentTag: Normalizer<ContentTagEntity> = (store, entity) => {
  const { id, name } = entity;

  store.ContentTag[id] = {
    ...base(entity),
    name
  };
};

const normalizeUser: Normalizer<UserEntity> = (store, entity) => {
  const { id, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission
  };
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (store, entity, isSearching) => {
  const { id, provider, accountId, user } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    accountId,
    provider,
    userId: user.id
  };

  normalizeEntity(store, user, isSearching);
};

const normalizeUserSession: Normalizer<UserSessionEntity> = (store, entity, isSearching) => {
  const { id, userAgent, user } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId: user.id,
    userAgent
  };

  normalizeEntity(store, user, isSearching);
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Content: normalizeContent,
  ContentRevision: normalizeContentRevision,
  ContentObject: normalizeContentObject,
  ContentTag: normalizeContentTag,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserSession: normalizeUserSession
};
