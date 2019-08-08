import {
  EntityObject,
  EntityType,
  Exercise,
  ExerciseReport,
  ExerciseSummary,
  ExerciseTag,
  ExerciseVote,
  Lang,
  Permission,
  Submission,
  SubmissionSummary,
  Theme,
  User,
  UserAccount,
  UserConfig,
  UserSession,
  UserSummary
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
  const { authorId } = query;

  return {
    authorId,
    ...page(query)
  };
};

const parseExerciseReport: Parser<ExerciseReport> = query => {
  const { targetId, reporterId } = query;

  return {
    targetId,
    reporterId
  };
};

const parseExerciseSummary: Parser<ExerciseSummary> = query => {
  const { authorId, lang, title, tags, description } = query;

  return {
    authorId,
    lang,
    title,
    tags: tags !== undefined ? tags.split(",") : undefined,
    description,
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

const parseExerciseVote: Parser<ExerciseVote> = query => {
  const { targetId, voterId } = query;

  return {
    targetId,
    voterId
  };
};

const parseSubmission: Parser<Submission> = query => {
  return {
    ...page(query)
  };
};

const parseSubmissionSummary: Parser<SubmissionSummary> = query => {
  const { submitterId: userId, exerciseId } = query;

  return {
    submitterId: userId,
    exerciseId,
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
  const { provider, accountId } = query;

  return {
    provider: provider as AuthProviderName,
    accountId,
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
  const { userId } = query;

  return {
    userId,
    ...page(query)
  };
};

const parseUserSummary: Parser<UserSummary> = query => {
  const { userId } = query;

  return {
    userId,
    ...page(query)
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  Exercise: parseExercise,
  ExerciseReport: parseExerciseReport,
  ExerciseSummary: parseExerciseSummary,
  ExerciseTag: parseExerciseTag,
  ExerciseVote: parseExerciseVote,
  Submission: parseSubmission,
  SubmissionSummary: parseSubmissionSummary,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserSession: parseUserSession,
  UserSummary: parseUserSummary
};
