import {
  Content,
  ContentBranch,
  ContentRevision,
  EntityObject,
  EntityType,
  Permission,
  User,
  UserAccount,
  UserSession
} from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { AuthProviderName } from "../../../shared/auth";

export type SearchQuery<E extends EntityObject> = { [P in keyof SearchParams<E>]?: string };

export const parseSearchParams = <E extends EntityObject>(type: E["type"], query: SearchQuery<E>) =>
  parsers[type](query) as SearchParams<E>;

const bool = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  return value === "true" ? true : false;
};

const page = (query: { page?: string }) => ({ page: (query.page && Number(query.page)) || 1 });

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => SearchParams<E>;

const parseContent: Parser<Content> = query => {
  const { sourceId } = query;

  return {
    type: "Content",
    sourceId,
    ...page(query)
  };
};

const parseContentBranch: Parser<ContentBranch> = query => {
  const { contentId, latestId, lang } = query;

  return {
    type: "ContentBranch",
    contentId,
    latestId,
    lang,
    ...page(query)
  };
};

const parseContentRevision: Parser<ContentRevision> = query => {
  const { branchId, authorId, version, comment, object, isDraft } = query;

  return {
    type: "ContentRevision",
    branchId,
    authorId,
    version: Number(version),
    comment,
    object: object && JSON.parse(object),
    isDraft: bool(isDraft),
    ...page(query)
  };
};

const parseUser: Parser<User> = query => {
  const { name, permission } = query;

  return {
    type: "User",
    name,
    permission: permission as Permission,
    ...page(query)
  };
};

const parseUserAccount: Parser<UserAccount> = query => {
  const { provider, accountId, userId } = query;

  return {
    type: "UserAccount",
    provider: provider as AuthProviderName,
    accountId,
    userId,
    ...page(query)
  };
};

const parseUserSession: Parser<UserSession> = query => {
  const { userAgent, userId } = query;

  return {
    type: "UserSession",
    userAgent,
    userId,
    ...page(query)
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  Content: parseContent,
  ContentBranch: parseContentBranch,
  ContentRevision: parseContentRevision,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserSession: parseUserSession
};
