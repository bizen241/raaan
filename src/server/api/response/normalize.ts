import { EntityType } from "../../../shared/api/entities";
import { BaseObject } from "../../../shared/api/entities/BaseObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/entity";
import {
  ContentEntity,
  ContentRevisionEntity,
  Entity,
  UserAccountEntity,
  UserEntity,
  UserSessionEntity
} from "../../database/entities";
import { BaseEntity } from "../../database/entities/BaseEntity";

export const normalizeEntities = (entities: Entity[]): EntityStore => {
  const store = createEntityStore();

  entities.forEach(entity => {
    normalizeEntity(store, entity);
  });

  return store;
};

const normalizeEntity = (store: EntityStore, entity: Entity) => {
  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }
  if (Object.keys(entity).length <= 2) {
    return;
  }

  normalizers[type](store, entity);
};

const base = <T extends EntityType>({ createdAt, updatedAt }: BaseEntity<T>): BaseObject => ({
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (store: EntityStore, entity: E) => void;

const normalizeContent: Normalizer<ContentEntity> = (store, entity) => {
  const { id, owner, latest, isPrivate, isArchived, isLocked } = entity;

  store.Content[id] = {
    ...base(entity),
    ownerId: owner.id,
    latestId: latest.id,
    title: latest.data.title,
    description: latest.data.description,
    isPrivate,
    isArchived,
    isLocked
  };
};

const normalizeContentRevision: Normalizer<ContentRevisionEntity> = (store, entity) => {
  const { id, content, author, version, comment, data: object, isProposed: isDraft } = entity;

  store.ContentRevision[id] = {
    ...base(entity),
    contentId: content.id,
    authorId: author.id,
    version,
    comment,
    data: object,
    isDraft
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

const normalizeUserAccount: Normalizer<UserAccountEntity> = (store, entity) => {
  const { id, provider, accountId, user } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    accountId,
    provider,
    userId: user.id
  };

  normalizeEntity(store, user);
};

const normalizeUserSession: Normalizer<UserSessionEntity> = (store, entity) => {
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
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserSession: normalizeUserSession
};
