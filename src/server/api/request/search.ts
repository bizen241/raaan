import { Account, EntityObject, EntityType, Session, User } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";

type SearchQuery<E extends EntityObject> = { [P in keyof SearchParams<E>]: string | undefined };

export const parseSearchParams = <E extends EntityObject>(type: EntityType, query: SearchQuery<E>) =>
  parsers[type](query);

const page = (query: { page: string | undefined }) => ({ page: (query.page && Number(query.page)) || 1 });

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => SearchParams<E>;

const parseAccount: Parser<Account> = query => {
  return {
    type: "Account",
    ...page(query)
  };
};

const parseSession: Parser<Session> = query => {
  return {
    type: "Session",
    ...page(query)
  };
};

const parseUser: Parser<User> = query => {
  return {
    type: "User",
    ...page(query)
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  Account: parseAccount,
  Session: parseSession,
  User: parseUser
};
