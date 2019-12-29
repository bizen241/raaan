import { Contest } from "./Contest";
import { ContestEntry } from "./ContestEntry";
import { Exercise } from "./Exercise";
import { ExerciseComment } from "./ExerciseComment";
import { ExerciseCommentSummary } from "./ExerciseCommentSummary";
import { ExerciseCommentVote } from "./ExerciseCommentVote";
import { ExerciseDiary } from "./ExerciseDiary";
import { ExerciseDraft } from "./ExerciseDraft";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseVote } from "./ExerciseVote";
import { Group } from "./Group";
import { GroupApplication } from "./GroupApplication";
import { GroupExercise } from "./GroupExercise";
import { GroupInvitation } from "./GroupInvitation";
import { GroupMember } from "./GroupMember";
import { GroupSecret } from "./GroupSecret";
import { GroupSummary } from "./GroupSummary";
import { Objection } from "./Objection";
import { ObjectionComment } from "./ObjectionComment";
import { ObjectionSummary } from "./ObjectionSummary";
import { Playlist } from "./Playlist";
import { PlaylistBookmark } from "./PlaylistBookmark";
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistSummary } from "./PlaylistSummary";
import { Report } from "./Report";
import { ReportComment } from "./ReportComment";
import { ReportSummary } from "./ReportSummary";
import { Revision } from "./Revision";
import { RevisionSummary } from "./RevisionSummary";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { Suggestion } from "./Suggestion";
import { SuggestionComment } from "./SuggestionComment";
import { SuggestionCommentSummary } from "./SuggestionCommentSummary";
import { SuggestionCommentVote } from "./SuggestionCommentVote";
import { SuggestionSummary } from "./SuggestionSummary";
import { Synonym } from "./Synonym";
import { Tag } from "./Tag";
import { TagFollow } from "./TagFollow";
import { TagSummary } from "./TagSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserDiary } from "./UserDiary";
import { UserFollow } from "./UserFollow";
import { UserMessage } from "./UserMessage";
import { UserSession } from "./UserSession";
import { UserSummary } from "./UserSummary";

export * from "./BaseExerciseObject";
export * from "./Contest";
export * from "./ContestEntry";
export * from "./Exercise";
export * from "./ExerciseComment";
export * from "./ExerciseCommentSummary";
export * from "./ExerciseCommentVote";
export * from "./ExerciseDiary";
export * from "./ExerciseDraft";
export * from "./ExerciseSummary";
export * from "./ExerciseVote";
export * from "./Group";
export * from "./GroupApplication";
export * from "./GroupExercise";
export * from "./GroupInvitation";
export * from "./GroupMember";
export * from "./GroupSecret";
export * from "./GroupSummary";
export * from "./Objection";
export * from "./ObjectionComment";
export * from "./ObjectionSummary";
export * from "./Playlist";
export * from "./PlaylistBookmark";
export * from "./PlaylistItem";
export * from "./PlaylistSummary";
export * from "./Report";
export * from "./ReportComment";
export * from "./ReportSummary";
export * from "./Revision";
export * from "./RevisionSummary";
export * from "./Submission";
export * from "./SubmissionSummary";
export * from "./Suggestion";
export * from "./SuggestionComment";
export * from "./SuggestionCommentSummary";
export * from "./SuggestionCommentVote";
export * from "./SuggestionSummary";
export * from "./Synonym";
export * from "./Tag";
export * from "./TagFollow";
export * from "./TagSummary";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserDiary";
export * from "./UserFollow";
export * from "./UserMessage";
export * from "./UserSession";
export * from "./UserSummary";

export type EntityTypeToEntity = {
  Contest: Contest;
  ContestEntry: ContestEntry;
  Exercise: Exercise;
  ExerciseComment: ExerciseComment;
  ExerciseCommentSummary: ExerciseCommentSummary;
  ExerciseCommentVote: ExerciseCommentVote;
  ExerciseDiary: ExerciseDiary;
  ExerciseDraft: ExerciseDraft;
  ExerciseSummary: ExerciseSummary;
  ExerciseVote: ExerciseVote;
  Group: Group;
  GroupApplication: GroupApplication;
  GroupExercise: GroupExercise;
  GroupInvitation: GroupInvitation;
  GroupMember: GroupMember;
  GroupSecret: GroupSecret;
  GroupSummary: GroupSummary;
  Objection: Objection;
  ObjectionComment: ObjectionComment;
  ObjectionSummary: ObjectionSummary;
  Playlist: Playlist;
  PlaylistBookmark: PlaylistBookmark;
  PlaylistItem: PlaylistItem;
  PlaylistSummary: PlaylistSummary;
  Report: Report;
  ReportComment: ReportComment;
  ReportSummary: ReportSummary;
  Revision: Revision;
  RevisionSummary: RevisionSummary;
  Submission: Submission;
  SubmissionSummary: SubmissionSummary;
  Suggestion: Suggestion;
  SuggestionComment: SuggestionComment;
  SuggestionCommentSummary: SuggestionCommentSummary;
  SuggestionCommentVote: SuggestionCommentVote;
  SuggestionSummary: SuggestionSummary;
  Synonym: Synonym;
  Tag: Tag;
  TagFollow: TagFollow;
  TagSummary: TagSummary;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserDiary: UserDiary;
  UserFollow: UserFollow;
  UserMessage: UserMessage;
  UserSession: UserSession;
  UserSummary: UserSummary;
};

export type EntityObject = EntityTypeToEntity[keyof EntityTypeToEntity];

export type EntityType = keyof EntityTypeToEntity;

type EntityTypeToObject = { [P in EntityType]: object };

export const createEntityTypeToObject = <T extends EntityTypeToObject>() => {
  const entityTypeToObject: EntityTypeToObject = {
    Contest: {},
    ContestEntry: {},
    Exercise: {},
    ExerciseComment: {},
    ExerciseCommentSummary: {},
    ExerciseCommentVote: {},
    ExerciseDiary: {},
    ExerciseDraft: {},
    ExerciseSummary: {},
    ExerciseVote: {},
    Group: {},
    GroupApplication: {},
    GroupExercise: {},
    GroupInvitation: {},
    GroupMember: {},
    GroupSecret: {},
    GroupSummary: {},
    Objection: {},
    ObjectionComment: {},
    ObjectionSummary: {},
    Playlist: {},
    PlaylistBookmark: {},
    PlaylistItem: {},
    PlaylistSummary: {},
    Report: {},
    ReportComment: {},
    ReportSummary: {},
    Revision: {},
    RevisionSummary: {},
    Submission: {},
    SubmissionSummary: {},
    Suggestion: {},
    SuggestionComment: {},
    SuggestionCommentSummary: {},
    SuggestionCommentVote: {},
    SuggestionSummary: {},
    Synonym: {},
    Tag: {},
    TagFollow: {},
    TagSummary: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserDiary: {},
    UserFollow: {},
    UserMessage: {},
    UserSession: {},
    UserSummary: {}
  };

  return entityTypeToObject as T;
};

export const mergeEntityTypeToObject = <T extends EntityTypeToObject>(
  target: Partial<T>,
  source: Partial<T> = {}
): T => {
  const merged: T = createEntityTypeToObject();

  (Object.keys(merged) as EntityType[]).forEach(entityType => {
    merged[entityType] = {
      ...target[entityType],
      ...source[entityType]
    };
  });

  return merged;
};
