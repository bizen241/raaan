import { Exercise } from "./Exercise";
import { ExerciseDiary } from "./ExerciseDiary";
import { ExerciseDraft } from "./ExerciseDraft";
import { ExerciseObjection } from "./ExerciseObjection";
import { ExerciseReport } from "./ExerciseReport";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseVote } from "./ExerciseVote";
import { Group } from "./Group";
import { GroupExercise } from "./GroupExercise";
import { GroupMember } from "./GroupMember";
import { GroupSummary } from "./GroupSummary";
import { Playlist } from "./Playlist";
import { PlaylistBookmark } from "./PlaylistBookmark";
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistObjection } from "./PlaylistObjection";
import { PlaylistReport } from "./PlaylistReport";
import { PlaylistSummary } from "./PlaylistSummary";
import { Revision } from "./Revision";
import { RevisionSummary } from "./RevisionSummary";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { Synonym } from "./Synonym";
import { SynonymReport } from "./SynonymReport";
import { Tag } from "./Tag";
import { TagFollow } from "./TagFollow";
import { TagSummary } from "./TagSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserDiary } from "./UserDiary";
import { UserFollow } from "./UserFollow";
import { UserMessage } from "./UserMessage";
import { UserObjection } from "./UserObjection";
import { UserReport } from "./UserReport";
import { UserSession } from "./UserSession";
import { UserSummary } from "./UserSummary";

export * from "./BaseExerciseObject";
export * from "./Exercise";
export * from "./ExerciseDiary";
export * from "./ExerciseDraft";
export * from "./ExerciseObjection";
export * from "./ExerciseReport";
export * from "./ExerciseSummary";
export * from "./ExerciseVote";
export * from "./Group";
export * from "./GroupExercise";
export * from "./GroupMember";
export * from "./GroupSummary";
export * from "./GroupSummary";
export * from "./Playlist";
export * from "./PlaylistBookmark";
export * from "./PlaylistItem";
export * from "./PlaylistObjection";
export * from "./PlaylistReport";
export * from "./PlaylistSummary";
export * from "./Revision";
export * from "./RevisionSummary";
export * from "./Submission";
export * from "./SubmissionSummary";
export * from "./Synonym";
export * from "./SynonymReport";
export * from "./Tag";
export * from "./TagFollow";
export * from "./TagSummary";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserDiary";
export * from "./UserFollow";
export * from "./UserMessage";
export * from "./UserObjection";
export * from "./UserReport";
export * from "./UserSession";
export * from "./UserSummary";

export type EntityObject =
  | Exercise
  | ExerciseDiary
  | ExerciseDraft
  | ExerciseObjection
  | ExerciseReport
  | ExerciseSummary
  | ExerciseVote
  | Group
  | GroupExercise
  | GroupMember
  | GroupSummary
  | Playlist
  | PlaylistBookmark
  | PlaylistItem
  | PlaylistObjection
  | PlaylistReport
  | PlaylistSummary
  | Revision
  | RevisionSummary
  | Submission
  | SubmissionSummary
  | Synonym
  | SynonymReport
  | Tag
  | TagFollow
  | TagSummary
  | User
  | UserAccount
  | UserConfig
  | UserDiary
  | UserFollow
  | UserMessage
  | UserObjection
  | UserReport
  | UserSession
  | UserSummary;

export type EntityTypeToEntity = {
  Exercise: Exercise;
  ExerciseDiary: ExerciseDiary;
  ExerciseDraft: ExerciseDraft;
  ExerciseObjection: ExerciseObjection;
  ExerciseReport: ExerciseReport;
  ExerciseSummary: ExerciseSummary;
  ExerciseVote: ExerciseVote;
  Group: Group;
  GroupExercise: GroupExercise;
  GroupMember: GroupMember;
  GroupSummary: GroupSummary;
  Playlist: Playlist;
  PlaylistBookmark: PlaylistBookmark;
  PlaylistItem: PlaylistItem;
  PlaylistObjection: PlaylistObjection;
  PlaylistReport: PlaylistReport;
  PlaylistSummary: PlaylistSummary;
  Revision: Revision;
  RevisionSummary: RevisionSummary;
  Submission: Submission;
  SubmissionSummary: SubmissionSummary;
  Synonym: Synonym;
  SynonymReport: SynonymReport;
  Tag: Tag;
  TagFollow: TagFollow;
  TagSummary: TagSummary;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserDiary: UserDiary;
  UserFollow: UserFollow;
  UserMessage: UserMessage;
  UserObjection: UserObjection;
  UserReport: UserReport;
  UserSession: UserSession;
  UserSummary: UserSummary;
};

export type EntityType = keyof EntityTypeToEntity;

type EntityTypeToObject = { [P in EntityType]: object };

export const createEntityTypeToObject = <T extends EntityTypeToObject>() => {
  const entityTypeToObject: EntityTypeToObject = {
    Exercise: {},
    ExerciseDiary: {},
    ExerciseDraft: {},
    ExerciseObjection: {},
    ExerciseReport: {},
    ExerciseSummary: {},
    ExerciseVote: {},
    Group: {},
    GroupExercise: {},
    GroupMember: {},
    GroupSummary: {},
    Playlist: {},
    PlaylistBookmark: {},
    PlaylistItem: {},
    PlaylistObjection: {},
    PlaylistReport: {},
    PlaylistSummary: {},
    Revision: {},
    RevisionSummary: {},
    Submission: {},
    SubmissionSummary: {},
    Synonym: {},
    SynonymReport: {},
    Tag: {},
    TagFollow: {},
    TagSummary: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserDiary: {},
    UserFollow: {},
    UserMessage: {},
    UserObjection: {},
    UserReport: {},
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
