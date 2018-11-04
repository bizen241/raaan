import { EntityType } from "../../../shared/api/entities";
import { Base } from "../../../shared/api/entities/Base";
import { createEntityStore, EntityStore } from "../../../shared/api/entities/store";
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
  if (store[entity.type][entity.id] !== undefined) {
    return;
  }
  if (Object.keys(entity).length <= 2) {
    return;
  }

  switch (entity.type) {
    case "Account": {
      return normalizeAccount(store, entity);
    }
    case "Session": {
      return normalizeSession(store, entity);
    }
    case "User": {
      return normalizeUser(store, entity);
    }
  }
};

const base = <T extends EntityType>({ type, id, createdAt, updatedAt }: BaseEntity<T>): Base<T> => ({
  type,
  id,
  createdAt: createdAt.valueOf(),
  updatedAt: updatedAt.valueOf()
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
