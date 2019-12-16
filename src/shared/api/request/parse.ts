import { AuthProviderName } from "../../auth";
import {
  Contest,
  ContestEntry,
  EntityObject,
  EntityType,
  EntityTypeToEntity,
  Exercise,
  ExerciseDiary,
  ExerciseDraft,
  ExerciseSummary,
  ExerciseVote,
  Group,
  GroupApplication,
  GroupExercise,
  GroupInvitation,
  GroupMember,
  GroupSecret,
  GroupSummary,
  Objection,
  ObjectionTarget,
  Permission,
  Playlist,
  PlaylistBookmark,
  PlaylistItem,
  PlaylistSummary,
  Report,
  ReportTarget,
  Revision,
  RevisionSummary,
  Submission,
  SubmissionSummary,
  Suggestion,
  SuggestionSummary,
  Synonym,
  Tag,
  TagFollow,
  TagSummary,
  User,
  UserAccount,
  UserConfig,
  UserDiary,
  UserFollow,
  UserMessage,
  UserSession,
  UserSummary
} from "../entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "./params";

export type SearchQuery<E extends EntityObject> = { [P in keyof Params<E>]?: string };

export const parseQuery = <T extends EntityType>(entityType: T, query: SearchQuery<EntityTypeToEntity[T]>) =>
  parsers[entityType](query) as Params<EntityTypeToEntity[T]>;

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

const parseContest: Parser<Contest> = query => {
  const { groupId } = query;

  return {
    ...base(query),
    groupId
  };
};

const parseContestEntry: Parser<ContestEntry> = query => {
  const { contestId } = query;

  return {
    ...base(query),
    contestId
  };
};

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

const parseGroupApplication: Parser<GroupApplication> = query => {
  return {
    ...base(query)
  };
};

const parseGroupExercise: Parser<GroupExercise> = query => {
  const { groupId, exerciseId } = query;

  return {
    ...base(query),
    groupId,
    exerciseId
  };
};

const parseGroupInvitation: Parser<GroupInvitation> = query => {
  const { groupId, targetId, ownerId } = query;

  return {
    ...base(query),
    groupId,
    targetId,
    ownerId
  };
};

const parseGroupMember: Parser<GroupMember> = query => {
  const { groupId, userId } = query;

  return {
    ...base(query),
    groupId,
    userId
  };
};

const parseGroupSecret: Parser<GroupSecret> = query => {
  const { groupId, value } = query;

  return {
    ...base(query),
    groupId,
    value
  };
};

const parseGroupSummary: Parser<GroupSummary> = query => {
  const { ownerId } = query;

  return {
    ...base(query),
    ownerId
  };
};

const parseObjection: Parser<Objection> = query => {
  const { objectorId, targetType, targetId } = query;

  return {
    ...base(query),
    objectorId,
    targetType: targetType as ObjectionTarget,
    targetId
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

const parsePlaylistSummary: Parser<PlaylistSummary> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseReport: Parser<Report> = query => {
  const { reporterId, targetType, targetId } = query;

  return {
    ...base(query),
    reporterId,
    targetType: targetType as ReportTarget,
    targetId
  };
};

const parseRevision: Parser<Revision> = query => {
  return {
    ...base(query)
  };
};

const parseRevisionSummary: Parser<RevisionSummary> = query => {
  const { exerciseId, searchSort } = query;

  return {
    ...base(query),
    exerciseId,
    searchSort: searchSort as RevisionSummary["searchSort"]
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

const parseSuggestion: Parser<Suggestion> = query => {
  return {
    ...base(query)
  };
};

const parseSuggestionSummary: Parser<SuggestionSummary> = query => {
  const { exerciseId } = query;

  return {
    ...base(query),
    exerciseId
  };
};

const parseSynonym: Parser<Synonym> = query => {
  return {
    ...base(query)
  };
};

const parseTag: Parser<Tag> = query => {
  const { name } = query;

  return {
    ...base(query),
    name
  };
};

const parseTagFollow: Parser<TagFollow> = query => {
  const { followerId, targetId } = query;

  return {
    ...base(query),
    followerId,
    targetId
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
  const { userId, provider, accountId } = query;

  return {
    ...base(query),
    userId,
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
  const { followerId, targetId } = query;

  return {
    ...base(query),
    followerId,
    targetId
  };
};

const parseUserMessage: Parser<UserMessage> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
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

const parsers: { [T in EntityType]: Parser<EntityTypeToEntity[T]> } = {
  Contest: parseContest,
  ContestEntry: parseContestEntry,
  Exercise: parseExercise,
  ExerciseDiary: parseExerciseDiary,
  ExerciseDraft: parseExerciseDraft,
  ExerciseSummary: parseExerciseSummary,
  ExerciseVote: parseExerciseVote,
  Group: parseGroup,
  GroupApplication: parseGroupApplication,
  GroupExercise: parseGroupExercise,
  GroupInvitation: parseGroupInvitation,
  GroupMember: parseGroupMember,
  GroupSecret: parseGroupSecret,
  GroupSummary: parseGroupSummary,
  Objection: parseObjection,
  Playlist: parsePlaylist,
  PlaylistBookmark: parsePlaylistBookmark,
  PlaylistItem: parsePlaylistItem,
  PlaylistSummary: parsePlaylistSummary,
  Report: parseReport,
  Revision: parseRevision,
  RevisionSummary: parseRevisionSummary,
  Submission: parseSubmission,
  SubmissionSummary: parseSubmissionSummary,
  Suggestion: parseSuggestion,
  SuggestionSummary: parseSuggestionSummary,
  Synonym: parseSynonym,
  Tag: parseTag,
  TagFollow: parseTagFollow,
  TagSummary: parseTagSummary,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserDiary: parseUserDiary,
  UserFollow: parseUserFollow,
  UserMessage: parseUserMessage,
  UserSession: parseUserSession,
  UserSummary: parseUserSummary
};
