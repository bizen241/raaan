import { EntityType } from "../../../shared/api/entities";
import { ContestEntity } from "./ContestEntity";
import { ContestEntryEntity } from "./ContestEntryEntity";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";
import { ExerciseCommentSummaryEntity } from "./ExerciseCommentSummaryEntity";
import { ExerciseCommentVoteEntity } from "./ExerciseCommentVoteEntity";
import { ExerciseDiaryEntity } from "./ExerciseDiaryEntity";
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
import { PlaylistBookmarkEntity } from "./PlaylistBookmarkEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistItemEntity } from "./PlaylistItemEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { RateLimitEntity } from "./RateLimitEntity";
import { ReportCommentEntity } from "./ReportCommentEntity";
import { ReportEntity } from "./ReportEntity";
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
import { TagEntity } from "./TagEntity";
import { TagFollowEntity } from "./TagFollowEntity";
import { TagSummaryEntity } from "./TagSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntity } from "./UserDiaryEntity";
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
export * from "./ExerciseDiaryEntity";
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
export * from "./ObjectionEntity";
export * from "./ObjectionCommentEntity";
export * from "./PlaylistBookmarkEntity";
export * from "./PlaylistEntity";
export * from "./PlaylistItemEntity";
export * from "./PlaylistSummaryEntity";
export * from "./ReportEntity";
export * from "./ReportCommentEntity";
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
export * from "./TagFollowEntity";
export * from "./TagSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntity";
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
  | ExerciseDiaryEntity
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
  | ObjectionEntity
  | ObjectionCommentEntity
  | PlaylistBookmarkEntity
  | PlaylistEntity
  | PlaylistItemEntity
  | PlaylistSummaryEntity
  | ReportEntity
  | ReportCommentEntity
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
  | TagFollowEntity
  | TagSummaryEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntity
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
    ExerciseDiary: ExerciseDiaryEntity,
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
    Playlist: PlaylistEntity,
    PlaylistBookmark: PlaylistBookmarkEntity,
    PlaylistItem: PlaylistItemEntity,
    PlaylistSummary: PlaylistSummaryEntity,
    Report: ReportEntity,
    ReportComment: ReportCommentEntity,
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
    TagFollow: TagFollowEntity,
    TagSummary: TagSummaryEntity,
    User: UserEntity,
    UserAccount: UserAccountEntity,
    UserConfig: UserConfigEntity,
    UserDiary: UserDiaryEntity,
    UserFollow: UserFollowEntity,
    UserMessage: UserMessageEntity,
    UserSession: UserSessionEntity,
    UserSummary: UserSummaryEntity
  } as { [P in EntityType]: Function })
];
