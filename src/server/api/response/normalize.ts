import { EntityType } from "../../../shared/api/entities";
import { BaseObject } from "../../../shared/api/entities/BaseObject";
import { createEntityStore, EntityStore } from "../../../shared/api/response/entity";
import {
  ContentBranchEntity,
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

const base = <T extends EntityType>({ type, id, createdAt, updatedAt }: BaseEntity<T>): BaseObject<T> => ({
  type,
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (store: EntityStore, entity: E) => void;

const normalizeContent: Normalizer<ContentEntity> = (store, entity) => {
  const { id, source } = entity;

  store.Content[id] = {
    ...base(entity),
    sourceId: source.id
  };
};

const normalizeContentBranch: Normalizer<ContentBranchEntity> = (store, entity) => {
  const { id, content, latest, lang } = entity;

  store.ContentBranch[id] = {
    ...base(entity),
    contentId: content.id,
    latestId: latest.id,
    lang
  };
};

const normalizeContentRevision: Normalizer<ContentRevisionEntity> = (store, entity) => {
  const { id, branch, author, version, comment, object, isDraft } = entity;

  store.ContentRevision[id] = {
    ...base(entity),
    branchId: branch.id,
    authorId: author.id,
    version,
    comment,
    object,
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
  ContentBranch: normalizeContentBranch,
  ContentRevision: normalizeContentRevision,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserSession: normalizeUserSession
};
