import { EntityType } from "../../../shared/api/entities";
import { ContestEntity } from "./ContestEntity";
import { ContestEntryEntity } from "./ContestEntryEntity";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";
import { ExerciseCommentSummaryEntity } from "./ExerciseCommentSummaryEntity";
import { ExerciseCommentVoteEntity } from "./ExerciseCommentVoteEntity";
import { ExerciseDiaryEntryEntity } from "./ExerciseDiaryEntryEntity";
import { ExerciseDraftEntity } from "./ExerciseDraftEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseVoteEntity } from "./ExerciseVoteEntity";
import { GroupApplicationEntity } from "./GroupApplicationEntity";
import { GroupEntity } from "./GroupEntity";
import { GroupExerciseEntity } from "./GroupExerciseEntity";
import { GroupInvitationEntity } from "./GroupInvitationEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";
import { GroupSecretEntity } from "./GroupSecretEntity";
import { GroupSummaryEntity } from "./GroupSummaryEntity";
import { ObjectionCommentEntity } from "./ObjectionCommentEntity";
import { ObjectionEntity } from "./ObjectionEntity";
import { ObjectionSummaryEntity } from "./ObjectionSummaryEntity";
import { PlaylistBookmarkEntity } from "./PlaylistBookmarkEntity";
import { PlaylistDiaryEntryEntity } from "./PlaylistDiaryEntryEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistItemEntity } from "./PlaylistItemEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { RateLimitEntity } from "./RateLimitEntity";
import { ReportCommentEntity } from "./ReportCommentEntity";
import { ReportEntity } from "./ReportEntity";
import { ReportSummaryEntity } from "./ReportSummaryEntity";
import { RevisionEntity } from "./RevisionEntity";
import { RevisionSummaryEntity } from "./RevisionSummaryEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { SubmissionSummaryEntity } from "./SubmissionSummaryEntity";
import { SuggestionCommentEntity } from "./SuggestionCommentEntity";
import { SuggestionCommentSummaryEntity } from "./SuggestionCommentSummaryEntity";
import { SuggestionCommentVoteEntity } from "./SuggestionCommentVoteEntity";
import { SuggestionEntity } from "./SuggestionEntity";
import { SuggestionSummaryEntity } from "./SuggestionSummaryEntity";
import { SynonymEntity } from "./SynonymEntity";
import { TagDiaryEntryEntity } from "./TagDiaryEntryEntity";
import { TagEntity } from "./TagEntity";
import { TagFollowEntity } from "./TagFollowEntity";
import { TagSummaryEntity } from "./TagSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntryEntity } from "./UserDiaryEntryEntity";
import { UserEntity } from "./UserEntity";
import { UserFollowEntity } from "./UserFollowEntity";
import { UserMessageEntity } from "./UserMessageEntity";
import { UserSessionEntity } from "./UserSessionEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

export * from "./ContestEntity";
export * from "./ContestEntryEntity";
export * from "./ExerciseCommentEntity";
export * from "./ExerciseCommentSummaryEntity";
export * from "./ExerciseCommentVoteEntity";
export * from "./ExerciseDiaryEntryEntity";
export * from "./ExerciseDraftEntity";
export * from "./ExerciseEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseVoteEntity";
export * from "./GroupApplicationEntity";
export * from "./GroupEntity";
export * from "./GroupExerciseEntity";
export * from "./GroupInvitationEntity";
export * from "./GroupMemberEntity";
export * from "./GroupSecretEntity";
export * from "./GroupSummaryEntity";
export * from "./ObjectionCommentEntity";
export * from "./ObjectionEntity";
export * from "./ObjectionSummaryEntity";
export * from "./PlaylistBookmarkEntity";
export * from "./PlaylistDiaryEntryEntity";
export * from "./PlaylistEntity";
export * from "./PlaylistItemEntity";
export * from "./PlaylistSummaryEntity";
export * from "./ReportCommentEntity";
export * from "./ReportEntity";
export * from "./ReportSummaryEntity";
export * from "./RevisionEntity";
export * from "./RevisionSummaryEntity";
export * from "./SubmissionEntity";
export * from "./SubmissionSummaryEntity";
export * from "./SuggestionCommentEntity";
export * from "./SuggestionCommentSummaryEntity";
export * from "./SuggestionCommentVoteEntity";
export * from "./SuggestionEntity";
export * from "./SuggestionSummaryEntity";
export * from "./SynonymEntity";
export * from "./TagEntity";
export * from "./TagDiaryEntryEntity";
export * from "./TagFollowEntity";
export * from "./TagSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntryEntity";
export * from "./UserEntity";
export * from "./UserFollowEntity";
export * from "./UserMessageEntity";
export * from "./UserSessionEntity";
export * from "./UserSummaryEntity";

export type Entity =
  | ContestEntity
  | ContestEntryEntity
  | ExerciseCommentEntity
  | ExerciseCommentSummaryEntity
  | ExerciseCommentVoteEntity
  | ExerciseDiaryEntryEntity
  | ExerciseDraftEntity
  | ExerciseEntity
  | ExerciseSummaryEntity
  | ExerciseVoteEntity
  | GroupApplicationEntity
  | GroupEntity
  | GroupExerciseEntity
  | GroupInvitationEntity
  | GroupMemberEntity
  | GroupSecretEntity
  | GroupSummaryEntity
  | ObjectionCommentEntity
  | ObjectionEntity
  | ObjectionSummaryEntity
  | PlaylistBookmarkEntity
  | PlaylistDiaryEntryEntity
  | PlaylistEntity
  | PlaylistItemEntity
  | PlaylistSummaryEntity
  | ReportCommentEntity
  | ReportEntity
  | ReportSummaryEntity
  | RevisionEntity
  | RevisionSummaryEntity
  | SubmissionEntity
  | SubmissionSummaryEntity
  | SuggestionCommentEntity
  | SuggestionCommentSummaryEntity
  | SuggestionCommentVoteEntity
  | SuggestionEntity
  | SuggestionSummaryEntity
  | SynonymEntity
  | TagEntity
  | TagDiaryEntryEntity
  | TagFollowEntity
  | TagSummaryEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntryEntity
  | UserEntity
  | UserFollowEntity
  | UserMessageEntity
  | UserSessionEntity
  | UserSummaryEntity;

export const entities = [
  RateLimitEntity,
  ...Object.values({
    Contest: ContestEntity,
    ContestEntry: ContestEntryEntity,
    Exercise: ExerciseEntity,
    ExerciseComment: ExerciseCommentEntity,
    ExerciseCommentSummary: ExerciseCommentSummaryEntity,
    ExerciseCommentVote: ExerciseCommentVoteEntity,
    ExerciseDiaryEntry: ExerciseDiaryEntryEntity,
    ExerciseDraft: ExerciseDraftEntity,
    ExerciseSummary: ExerciseSummaryEntity,
    ExerciseVote: ExerciseVoteEntity,
    Group: GroupEntity,
    GroupApplication: GroupApplicationEntity,
    GroupExercise: GroupExerciseEntity,
    GroupInvitation: GroupInvitationEntity,
    GroupMember: GroupMemberEntity,
    GroupSecret: GroupSecretEntity,
    GroupSummary: GroupSummaryEntity,
    Objection: ObjectionEntity,
    ObjectionComment: ObjectionCommentEntity,
    ObjectionSummary: ObjectionSummaryEntity,
    Playlist: PlaylistEntity,
    PlaylistBookmark: PlaylistBookmarkEntity,
    PlaylistDiaryEntry: PlaylistDiaryEntryEntity,
    PlaylistItem: PlaylistItemEntity,
    PlaylistSummary: PlaylistSummaryEntity,
    Report: ReportEntity,
    ReportComment: ReportCommentEntity,
    ReportSummary: ReportSummaryEntity,
    Revision: RevisionEntity,
    RevisionSummary: RevisionSummaryEntity,
    Submission: SubmissionEntity,
    SubmissionSummary: SubmissionSummaryEntity,
    Suggestion: SuggestionEntity,
    SuggestionComment: SuggestionCommentEntity,
    SuggestionCommentSummary: SuggestionCommentSummaryEntity,
    SuggestionCommentVote: SuggestionCommentVoteEntity,
    SuggestionSummary: SuggestionSummaryEntity,
    Synonym: SynonymEntity,
    Tag: TagEntity,
    TagDiaryEntry: TagDiaryEntryEntity,
    TagFollow: TagFollowEntity,
    TagSummary: TagSummaryEntity,
    User: UserEntity,
    UserAccount: UserAccountEntity,
    UserConfig: UserConfigEntity,
    UserDiaryEntry: UserDiaryEntryEntity,
    UserFollow: UserFollowEntity,
    UserMessage: UserMessageEntity,
    UserSession: UserSessionEntity,
    UserSummary: UserSummaryEntity
  } as { [P in EntityType]: Function })
];
