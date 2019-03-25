import {
  Exercise,
  ExerciseDetail,
  ExerciseRevision,
  ExerciseTag,
  EntityObject,
  EntityType,
  Lang,
  NavigationMode,
  Permission,
  Theme,
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

/*
const bool = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  return value === "true" ? true : false;
};
*/

const page = (query: { limit?: string; offset?: string }) => ({
  limit: (query.limit && Number(query.limit)) || 10,
  offset: (query.offset && Number(query.offset)) || 0
});

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => SearchParams<E>;

const parseExercise: Parser<Exercise> = query => {
  const { detailId, tagIds } = query;

  return {
    detailId,
    tagIds: tagIds && JSON.parse(tagIds),
    ...page(query)
  };
};

const parseExerciseDetail: Parser<ExerciseDetail> = query => {
  const { lang, tags, title, description, rubric, items, comment, navigationMode } = query;

  return {
    lang,
    tags: tags && JSON.parse(tags),
    title,
    description,
    rubric,
    items: items && JSON.parse(items),
    comment,
    navigationMode: navigationMode as NavigationMode,
    ...page(query)
  };
};

const parseExerciseRevision: Parser<ExerciseRevision> = query => {
  const { contentId, detailId } = query;

  return {
    contentId,
    detailId,
    ...page(query)
  };
};

const parseExerciseTag: Parser<ExerciseTag> = query => {
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
  const { lang, theme } = query;

  return {
    lang: lang as Lang | undefined,
    theme: theme as Theme | undefined,
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
  Exercise: parseExercise,
  ExerciseDetail: parseExerciseDetail,
  ExerciseRevision: parseExerciseRevision,
  ExerciseTag: parseExerciseTag,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserSession: parseUserSession
};
