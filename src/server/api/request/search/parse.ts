import {
  EntityObject,
  EntityType,
  Exercise,
  ExerciseDiary,
  ExerciseDraft,
  ExerciseObjection,
  ExerciseReport,
  ExerciseSummary,
  ExerciseVote,
  Group,
  GroupExercise,
  GroupMember,
  GroupPlaylist,
  Permission,
  Playlist,
  PlaylistBookmark,
  PlaylistItem,
  PlaylistObjection,
  PlaylistReport,
  PlaylistSummary,
  Revision,
  RevisionSummary,
  Submission,
  SubmissionSummary,
  Synonym,
  SynonymReport,
  Tag,
  TagFollow,
  TagSummary,
  User,
  UserAccount,
  UserConfig,
  UserDiary,
  UserFollow,
  UserObjection,
  UserReport,
  UserSession,
  UserSummary
} from "../../../../shared/api/entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "../../../../shared/api/request/params";
import { AuthProviderName } from "../../../../shared/auth";

export type SearchQuery<E extends EntityObject> = { [P in keyof Params<E>]?: string };

export const parseQuery = <E extends EntityObject>(type: EntityType, query: SearchQuery<E>) =>
  parsers[type](query) as Params<E>;

const bool = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  return value === "true" ? true : false;
};

const base = <E extends EntityObject>(query: SearchQuery<E>) => ({
  searchLimit: Number(query.searchLimit) || defaultSearchLimit,
  searchOffset: Number(query.searchOffset) || defaultSearchOffset,
  searchOrder: query.searchOrder as "ASC" | "DESC"
});

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => Params<E>;

const parseExercise: Parser<Exercise> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseExerciseDiary: Parser<ExerciseDiary> = query => {
  const { exerciseId } = query;

  return {
    ...base(query),
    exerciseId
  };
};

const parseExerciseDraft: Parser<ExerciseDraft> = query => {
  const { exerciseId } = query;

  return {
    ...base(query),
    exerciseId
  };
};

const parseExerciseObjection: Parser<ExerciseObjection> = query => {
  return {
    ...base(query)
  };
};

const parseExerciseReport: Parser<ExerciseReport> = query => {
  const { reporterId, targetId } = query;

  return {
    ...base(query),
    reporterId,
    targetId
  };
};

const parseExerciseSummary: Parser<ExerciseSummary> = query => {
  const { authorId, lang, title, tags, description, isEditing, searchSort } = query;

  return {
    ...base(query),
    authorId,
    lang,
    title,
    tags,
    description,
    isEditing: bool(isEditing),
    searchSort: searchSort as ExerciseSummary["searchSort"]
  };
};

const parseExerciseVote: Parser<ExerciseVote> = query => {
  const { targetId, voterId, isUp } = query;

  return {
    ...base(query),
    targetId,
    voterId,
    isUp: bool(isUp)
  };
};

const parseGroup: Parser<Group> = query => {
  return {
    ...base(query)
  };
};

const parseGroupExercise: Parser<GroupExercise> = query => {
  return {
    ...base(query)
  };
};

const parseGroupMember: Parser<GroupMember> = query => {
  return {
    ...base(query)
  };
};

const parseGroupPlaylist: Parser<GroupPlaylist> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylist: Parser<Playlist> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistBookmark: Parser<PlaylistBookmark> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistItem: Parser<PlaylistItem> = query => {
  const { authorId, playlistId, exerciseId } = query;

  return {
    ...base(query),
    authorId,
    playlistId,
    exerciseId
  };
};

const parsePlaylistObjection: Parser<PlaylistObjection> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistReport: Parser<PlaylistReport> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistSummary: Parser<PlaylistSummary> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseRevision: Parser<Revision> = query => {
  return {
    ...base(query)
  };
};

const parseRevisionSummary: Parser<RevisionSummary> = query => {
  return {
    ...base(query)
  };
};

const parseSubmission: Parser<Submission> = query => {
  return {
    ...base(query)
  };
};

const parseSubmissionSummary: Parser<SubmissionSummary> = query => {
  const { submitterId, exerciseId } = query;

  return {
    ...base(query),
    submitterId,
    exerciseId
  };
};

const parseSynonym: Parser<Synonym> = query => {
  return {
    ...base(query)
  };
};

const parseSynonymReport: Parser<SynonymReport> = query => {
  return {
    ...base(query)
  };
};

const parseTag: Parser<Tag> = query => {
  return {
    ...base(query)
  };
};

const parseTagFollow: Parser<TagFollow> = query => {
  return {
    ...base(query)
  };
};

const parseTagSummary: Parser<TagSummary> = query => {
  return {
    ...base(query)
  };
};

const parseUser: Parser<User> = query => {
  const { name, permission } = query;

  return {
    ...base(query),
    name,
    permission: permission as Permission
  };
};

const parseUserAccount: Parser<UserAccount> = query => {
  const { provider, accountId } = query;

  return {
    ...base(query),
    provider: provider as AuthProviderName,
    accountId
  };
};

const parseUserConfig: Parser<UserConfig> = query => {
  return {
    ...base(query)
  };
};

const parseUserDiary: Parser<UserDiary> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parseUserFollow: Parser<UserFollow> = query => {
  return {
    ...base(query)
  };
};

const parseUserObjection: Parser<UserObjection> = query => {
  return {
    ...base(query)
  };
};

const parseUserReport: Parser<UserReport> = query => {
  return {
    ...base(query)
  };
};

const parseUserSession: Parser<UserSession> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parseUserSummary: Parser<UserSummary> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parsers: { [T in EntityType]: Parser<any> } = {
  Exercise: parseExercise,
  ExerciseDiary: parseExerciseDiary,
  ExerciseDraft: parseExerciseDraft,
  ExerciseObjection: parseExerciseObjection,
  ExerciseReport: parseExerciseReport,
  ExerciseSummary: parseExerciseSummary,
  ExerciseVote: parseExerciseVote,
  Group: parseGroup,
  GroupExercise: parseGroupExercise,
  GroupMember: parseGroupMember,
  GroupPlaylist: parseGroupPlaylist,
  Playlist: parsePlaylist,
  PlaylistBookmark: parsePlaylistBookmark,
  PlaylistItem: parsePlaylistItem,
  PlaylistObjection: parsePlaylistObjection,
  PlaylistReport: parsePlaylistReport,
  PlaylistSummary: parsePlaylistSummary,
  Revision: parseRevision,
  RevisionSummary: parseRevisionSummary,
  Submission: parseSubmission,
  SubmissionSummary: parseSubmissionSummary,
  Synonym: parseSynonym,
  SynonymReport: parseSynonymReport,
  Tag: parseTag,
  TagFollow: parseTagFollow,
  TagSummary: parseTagSummary,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserDiary: parseUserDiary,
  UserFollow: parseUserFollow,
  UserObjection: parseUserObjection,
  UserReport: parseUserReport,
  UserSession: parseUserSession,
  UserSummary: parseUserSummary
};
