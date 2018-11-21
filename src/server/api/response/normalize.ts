import { EntityType } from "../../../shared/api/entities";
import { Base } from "../../../shared/api/entities/Base";
import { createEntityStore, EntityStore } from "../../../shared/api/response/entity";
import { AccountEntity, EntityClass, SessionEntity, UserEntity } from "../../database/entities";
import { BaseEntity } from "../../database/entities/BaseEntity";

export const normalizeEntities = (entities: EntityClass[]): EntityStore => {
  const store = createEntityStore();

  entities.forEach(entity => {
    normalizeEntity(store, entity);
  });

  return store;
};

const normalizeEntity = (store: EntityStore, entity: EntityClass) => {
  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }
  if (Object.keys(entity).length <= 2) {
    return;
  }

  normalizers[type](store, entity);
};

const base = <T extends EntityType>({ type, id, createdAt, updatedAt }: BaseEntity<T>): Base<T> => ({
  type,
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf(),
  fetchedAt: new Date().valueOf()
});

type Normalizer<E> = (store: EntityStore, entity: E) => void;

const normalizeAccount: Normalizer<AccountEntity> = (store, entity) => {
  const { id, provider, accountId, user } = entity;

  store.Account[id] = {
    ...base(entity),
    accountId,
    provider,
    userId: user.id
  };

  normalizeEntity(store, user);
};

const normalizeSession: Normalizer<SessionEntity> = (store, entity) => {
  const { id, userAgent, user } = entity;

  store.Session[id] = {
    ...base(entity),
    userAgent
  };

  normalizeEntity(store, user);
};

const normalizeUser: Normalizer<UserEntity> = (store, entity) => {
  const { id, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission
  };
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Account: normalizeAccount,
  Session: normalizeSession,
  User: normalizeUser
};
