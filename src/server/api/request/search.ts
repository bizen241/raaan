import { EntityObject, EntityType, User, UserAccount, UserSession } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";

type SearchQuery<E extends EntityObject> = { [P in keyof SearchParams<E>]: string | undefined };

export const parseSearchParams = <E extends EntityObject>(type: EntityType, query: SearchQuery<E>) =>
  parsers[type](query);

const page = (query: { page: string | undefined }) => ({ page: (query.page && Number(query.page)) || 1 });

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => SearchParams<E>;

const parseUser: Parser<User> = query => {
  return {
    type: "User",
    ...page(query)
  };
};

const parseUserAccount: Parser<UserAccount> = query => {
  return {
    type: "UserAccount",
    ...page(query)
  };
};

const parseUserSession: Parser<UserSession> = query => {
  return {
    type: "UserSession",
    ...page(query)
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  User: parseUser,
  UserAccount: parseUserAccount,
  UserSession: parseUserSession
};
