import { EntityType } from "../../../shared/api/entities";
import { ExerciseDiaryEntity } from "./ExerciseDiaryEntity";
import { ExerciseDraftEntity } from "./ExerciseDraftEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseObjectionEntity } from "./ExerciseObjectionEntity";
import { ExerciseReportEntity } from "./ExerciseReportEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseVoteEntity } from "./ExerciseVoteEntity";
import { GroupEntity } from "./GroupEntity";
import { GroupExerciseEntity } from "./GroupExerciseEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupPlaylistEntity } from "./GroupPlaylistEntity";
import { PlaylistBookmarkEntity } from "./PlaylistBookmarkEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistItemEntity } from "./PlaylistItemEntity";
import { PlaylistObjectionEntity } from "./PlaylistObjectionEntity";
import { PlaylistReportEntity } from "./PlaylistReportEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { RevisionEntity } from "./RevisionEntity";
import { RevisionSummaryEntity } from "./RevisionSummaryEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { SubmissionSummaryEntity } from "./SubmissionSummaryEntity";
import { SynonymEntity } from "./SynonymEntity";
import { SynonymReportEntity } from "./SynonymReportEntity";
import { TagEntity } from "./TagEntity";
import { TagFollowEntity } from "./TagFollowEntity";
import { TagSummaryEntity } from "./TagSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntity } from "./UserDiaryEntity";
import { UserEntity } from "./UserEntity";
import { UserFollowEntity } from "./UserFollowEntity";
import { UserObjectionEntity } from "./UserObjectionEntity";
import { UserReportEntity } from "./UserReportEntity";
import { UserSessionEntity } from "./UserSessionEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

export * from "./ExerciseDiaryEntity";
export * from "./ExerciseDraftEntity";
export * from "./ExerciseEntity";
export * from "./ExerciseObjectionEntity";
export * from "./ExerciseReportEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseVoteEntity";
export * from "./GroupEntity";
export * from "./GroupExerciseEntity";
export * from "./GroupMemberEntity";
export * from "./GroupPlaylistEntity";
export * from "./PlaylistBookmarkEntity";
export * from "./PlaylistEntity";
export * from "./PlaylistItemEntity";
export * from "./PlaylistObjectionEntity";
export * from "./PlaylistReportEntity";
export * from "./PlaylistSummaryEntity";
export * from "./RevisionEntity";
export * from "./RevisionSummaryEntity";
export * from "./SubmissionEntity";
export * from "./SubmissionSummaryEntity";
export * from "./SynonymEntity";
export * from "./SynonymReportEntity";
export * from "./TagEntity";
export * from "./TagFollowEntity";
export * from "./TagSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntity";
export * from "./UserEntity";
export * from "./UserFollowEntity";
export * from "./UserObjectionEntity";
export * from "./UserReportEntity";
export * from "./UserSessionEntity";
export * from "./UserSummaryEntity";

export type Entity =
  | ExerciseDiaryEntity
  | ExerciseDraftEntity
  | ExerciseEntity
  | ExerciseObjectionEntity
  | ExerciseReportEntity
  | ExerciseSummaryEntity
  | ExerciseVoteEntity
  | GroupEntity
  | GroupExerciseEntity
  | GroupMemberEntity
  | GroupPlaylistEntity
  | PlaylistBookmarkEntity
  | PlaylistEntity
  | PlaylistItemEntity
  | PlaylistObjectionEntity
  | PlaylistReportEntity
  | PlaylistSummaryEntity
  | RevisionEntity
  | RevisionSummaryEntity
  | SubmissionEntity
  | SubmissionSummaryEntity
  | SynonymEntity
  | SynonymReportEntity
  | TagEntity
  | TagFollowEntity
  | TagSummaryEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntity
  | UserEntity
  | UserFollowEntity
  | UserObjectionEntity
  | UserReportEntity
  | UserSessionEntity
  | UserSummaryEntity;

export const entities = Object.values({
  Exercise: ExerciseEntity,
  ExerciseDiary: ExerciseDiaryEntity,
  ExerciseDraft: ExerciseDraftEntity,
  ExerciseObjection: ExerciseObjectionEntity,
  ExerciseReport: ExerciseReportEntity,
  ExerciseSummary: ExerciseSummaryEntity,
  ExerciseVote: ExerciseVoteEntity,
  Group: GroupEntity,
  GroupExercise: GroupExerciseEntity,
  GroupMember: GroupMemberEntity,
  GroupPlaylist: GroupPlaylistEntity,
  Playlist: PlaylistEntity,
  PlaylistBookmark: PlaylistBookmarkEntity,
  PlaylistItem: PlaylistItemEntity,
  PlaylistObjection: PlaylistObjectionEntity,
  PlaylistReport: PlaylistReportEntity,
  PlaylistSummary: PlaylistSummaryEntity,
  Revision: RevisionEntity,
  RevisionSummary: RevisionSummaryEntity,
  Submission: SubmissionEntity,
  SubmissionSummary: SubmissionSummaryEntity,
  Synonym: SynonymEntity,
  SynonymReport: SynonymReportEntity,
  Tag: TagEntity,
  TagFollow: TagFollowEntity,
  TagSummary: TagSummaryEntity,
  User: UserEntity,
  UserAccount: UserAccountEntity,
  UserConfig: UserConfigEntity,
  UserDiary: UserDiaryEntity,
  UserFollow: UserFollowEntity,
  UserObjection: UserObjectionEntity,
  UserReport: UserReportEntity,
  UserSession: UserSessionEntity,
  UserSummary: UserSummaryEntity
} as { [P in EntityType]: Function });
