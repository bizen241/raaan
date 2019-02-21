import {
  Content,
  ContentRevision,
  ContentTag,
  EntityObject,
  EntityType,
  Permission,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { AuthProviderName } from "../../../../shared/auth";

export type SearchQuery<E extends EntityObject> = { [P in keyof SearchParams<E>]?: string };

export const parseSearchParams = <E extends EntityObject>(type: EntityType, query: SearchQuery<E>) =>
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
  const { latestId } = query;

  return {
    latestId,
    ...page(query)
  };
};

const parseContentRevision: Parser<ContentRevision> = query => {
  const { contentId, lang, tags, title, summary, comment, items, isLinear } = query;

  return {
    contentId,
    lang,
    tags: tags && JSON.parse(tags),
    title,
    summary,
    comment,
    items: items && JSON.parse(items),
    isLinear: bool(isLinear),
    ...page(query)
  };
};

const parseContentTag: Parser<ContentTag> = query => {
  const { name } = query;

  return {
    name,
    ...page(query)
  };
};

const parseUser: Parser<User> = query => {
  const { name, permission } = query;

  return {
    name,
    permission: permission as Permission,
    ...page(query)
  };
};

const parseUserAccount: Parser<UserAccount> = query => {
  const { provider, accountId, userId } = query;

  return {
    provider: provider as AuthProviderName,
    accountId,
    userId,
    ...page(query)
  };
};

const parseUserConfig: Parser<UserConfig> = query => {
  const { userId, name, settings } = query;

  return {
    userId,
    name,
    settings: settings && JSON.parse(settings),
    ...page(query)
  };
};

const parseUserSession: Parser<UserSession> = query => {
  const { userAgent, userId } = query;

  return {
    userAgent,
    userId,
    ...page(query)
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  Content: parseContent,
  ContentRevision: parseContentRevision,
  ContentTag: parseContentTag,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserSession: parseUserSession
};
