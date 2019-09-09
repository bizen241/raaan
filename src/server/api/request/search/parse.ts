import {
  EntityObject,
  EntityType,
  Exercise,
  ExerciseDiary,
  ExerciseReport,
  ExerciseSummary,
  ExerciseTag,
  ExerciseVote,
  Lang,
  Permission,
  Playlist,
  PlaylistBookmark,
  PlaylistItem,
  PlaylistReport,
  PlaylistSummary,
  PlaylistTag,
  Submission,
  SubmissionSummary,
  Theme,
  User,
  UserAccount,
  UserConfig,
  UserDiary,
  UserReport,
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

const page = <E extends EntityObject>(query: SearchQuery<E>) => ({
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

const parseExerciseDiary: Parser<ExerciseDiary> = query => {
  const { exerciseId } = query;

  return {
    exerciseId,
    ...page(query)
  };
};

const parseExerciseReport: Parser<ExerciseReport> = query => {
  const { targetId, reporterId } = query;

  return {
    targetId,
    reporterId,
    ...page(query)
  };
};

const parseExerciseSummary: Parser<ExerciseSummary> = query => {
  const { authorId, lang, title, tags, description } = query;

  return {
    authorId,
    lang,
    title,
    tags,
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

const parsePlaylist: Parser<Playlist> = query => {
  return {
    ...page(query)
  };
};

const parsePlaylistBookmark: Parser<PlaylistBookmark> = query => {
  return {
    ...page(query)
  };
};

const parsePlaylistItem: Parser<PlaylistItem> = query => {
  return {
    ...page(query)
  };
};

const parsePlaylistReport: Parser<PlaylistReport> = query => {
  return {
    ...page(query)
  };
};

const parsePlaylistSummary: Parser<PlaylistSummary> = query => {
  return {
    ...page(query)
  };
};

const parsePlaylistTag: Parser<PlaylistTag> = query => {
  return {
    ...page(query)
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

const parseUserDiary: Parser<UserDiary> = query => {
  const { userId } = query;

  return {
    userId,
    ...page(query)
  };
};

const parseUserReport: Parser<UserReport> = query => {
  return {
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
  ExerciseDiary: parseExerciseDiary,
  ExerciseReport: parseExerciseReport,
  ExerciseSummary: parseExerciseSummary,
  ExerciseTag: parseExerciseTag,
  ExerciseVote: parseExerciseVote,
  Playlist: parsePlaylist,
  PlaylistBookmark: parsePlaylistBookmark,
  PlaylistItem: parsePlaylistItem,
  PlaylistReport: parsePlaylistReport,
  PlaylistSummary: parsePlaylistSummary,
  PlaylistTag: parsePlaylistTag,
  Submission: parseSubmission,
  SubmissionSummary: parseSubmissionSummary,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserDiary: parseUserDiary,
  UserReport: parseUserReport,
  UserSession: parseUserSession,
  UserSummary: parseUserSummary
};
