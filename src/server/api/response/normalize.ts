import createError from "http-errors";
import { createEntityTypeToObject, EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { EntityStore } from "../../../shared/api/response/get";
import {
  AppDiaryEntryEntity,
  AppSummaryEntity,
  ContestEntity,
  ContestEntryEntity,
  Entity,
  ExerciseCommentEntity,
  ExerciseCommentSummaryEntity,
  ExerciseCommentVoteEntity,
  ExerciseDiaryEntryEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  ExerciseVoteEntity,
  GroupApplicationEntity,
  GroupEntity,
  GroupExerciseEntity,
  GroupInvitationEntity,
  GroupMemberEntity,
  GroupSecretEntity,
  GroupSummaryEntity,
  ObjectionCommentEntity,
  ObjectionEntity,
  ObjectionSummaryEntity,
  PlaylistBookmarkEntity,
  PlaylistDiaryEntryEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistSummaryEntity,
  ReportCommentEntity,
  ReportEntity,
  ReportSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  SuggestionCommentEntity,
  SuggestionCommentSummaryEntity,
  SuggestionCommentVoteEntity,
  SuggestionEntity,
  SuggestionSummaryEntity,
  SynonymEntity,
  TagDiaryEntryEntity,
  TagEntity,
  TagFollowEntity,
  TagSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntryEntity,
  UserEntity,
  UserFollowEntity,
  UserMessageEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";
import { BaseEntityClass } from "../../database/entities/BaseEntityClass";

export interface RequestContext {
  sessionId?: string;
}

export const normalizeEntities = (context: RequestContext, entities: Entity[]) => {
  const store: EntityStore = createEntityTypeToObject();

  entities.forEach(entity => {
    normalizeEntity(context, store, entity);
  });

  (Object.keys(store) as EntityType[]).forEach(entityType => {
    const count = Object.values(store[entityType]).length;

    if (count === 0) {
      delete store[entityType];
    }
  });

  return store as Partial<EntityStore>;
};

const normalizeEntity = (context: RequestContext, store: EntityStore, entity: Entity | undefined) => {
  if (entity === undefined) {
    return;
  }

  const { type, id } = entity;

  if (store[type][id] !== undefined) {
    return;
  }

  normalizers[type](context, store, entity);
};

const base = ({ id, createdAt, updatedAt }: BaseEntityClass): BaseEntityObject => ({
  id,
  createdAt: createdAt.getTime(),
  updatedAt: updatedAt.getTime(),
  fetchedAt: new Date().getTime()
});

type Normalizer<E> = (context: RequestContext, store: EntityStore, entity: E) => void;

const normalizeAppDiaryEntry: Normalizer<AppDiaryEntryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.AppDiaryEntry[id] = {
    ...base(entity),
    date,
    submittedCount,
    typedCount
  };
};

const normalizeAppSummary: Normalizer<AppSummaryEntity> = (_, store, entity) => {
  const { id, submittedCount, typedCount } = entity;

  store.AppSummary[id] = {
    ...base(entity),
    submittedCount,
    typedCount
  };
};

const normalizeContest: Normalizer<ContestEntity> = (_, store, entity) => {
  const { id, exerciseId, title, startAt, finishAt } = entity;

  store.Contest[id] = {
    ...base(entity),
    exerciseId,
    title,
    startAt: startAt.getTime(),
    finishAt: finishAt.getTime()
  };
};

const normalizeContestEntry: Normalizer<ContestEntryEntity> = (context, store, entity) => {
  const { id, contest, contestId, participant, typeCount, time, accuracy } = entity;
  if (participant === undefined) {
    throw createError(500, "contestEntry.participant is not defined");
  }
  if (participant.user === undefined) {
    throw createError(500, "contestEntry.participant.user is not defined");
  }

  store.ContestEntry[id] = {
    ...base(entity),
    contestId,
    userSummaryId: participant.user.summaryId,
    typeCount,
    time,
    accuracy
  };

  normalizeEntity(context, store, contest);
};

const normalizeExercise: Normalizer<ExerciseEntity> = (context, store, entity) => {
  const {
    id,
    author,
    authorId,
    summary,
    summaryId,
    latest,
    latestId,
    draft,
    draftId,
    isDraft,
    isLocked,
    isPrivate
  } = entity;
  if (summary === undefined) {
    throw createError(500, "exercise.summary is not defined");
  }
  if (latest === undefined) {
    throw createError(500, "exercise.latest is not defined");
  }
  if (draft === undefined) {
    throw createError(500, "exercise.draft is not defined");
  }

  const content = isDraft ? draft : latest;
  const { lang, title, tags, description, questions, references, isRandom } = content;

  store.Exercise[id] = {
    ...base(entity),
    summaryId,
    authorId,
    latestId,
    draftId,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isDraft,
    isRandom,
    isLocked,
    isPrivate
  };

  summary.exercise = entity;

  normalizeEntity(context, store, author);
  normalizeEntity(context, store, summary);
};

const normalizeExerciseComment: Normalizer<ExerciseCommentEntity> = (context, store, entity) => {
  const { id, summary, summaryId, authorId, body } = entity;

  store.ExerciseComment[id] = {
    ...base(entity),
    summaryId,
    authorId,
    body
  };

  normalizeEntity(context, store, summary);
};

const normalizeExerciseCommentSummary: Normalizer<ExerciseCommentSummaryEntity> = (_, store, entity) => {
  const { id, parentId, upvoteCount, downvoteCount } = entity;

  store.ExerciseCommentSummary[id] = {
    ...base(entity),
    parentId,
    upvoteCount,
    downvoteCount
  };
};

const normalizeExerciseCommentVote: Normalizer<ExerciseCommentVoteEntity> = (_, store, entity) => {
  const { id, target, voter, isUp } = entity;
  if (target === undefined) {
    throw createError(500, "exerciseCommentVote.target is not defined");
  }
  if (voter === undefined) {
    throw createError(500, "exerciseCommentVote.voter is not defined");
  }

  store.ExerciseCommentVote[id] = {
    ...base(entity),
    targetSummaryId: target.summaryId,
    voterSummaryId: voter.summaryId,
    isUp
  };
};

const normalizeExerciseDiaryEntry: Normalizer<ExerciseDiaryEntryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.ExerciseDiaryEntry[id] = {
    ...base(entity),
    date,
    submittedCount,
    typedCount
  };
};

const normalizeExerciseDraft: Normalizer<ExerciseDraftEntity> = (_, store, entity) => {
  const { id, exerciseId, lang, title, tags, description, questions, references, isRandom, isMerged } = entity;

  store.ExerciseDraft[id] = {
    ...base(entity),
    exerciseId,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isRandom,
    isMerged
  };
};

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (_, store, entity) => {
  const {
    id,
    exercise,
    exerciseId,
    tags = [],
    upvoteCount,
    downvoteCount,
    commentCount,
    submittedCount: submitCount
  } = entity;
  if (exercise === undefined) {
    throw createError(500, "exerciseSummary.exercise is not defined");
  }

  const { author, authorId, latest, draft, isDraft, isPrivate, isLocked } = exercise;
  if (author === undefined) {
    throw createError(500, "exerciseSummary.exercise.author is not defined");
  }
  if (latest === undefined) {
    throw createError(500, "exerciseSummary.exercise.latest is not defined");
  }
  if (draft === undefined) {
    throw createError(500, "exerciseSummary.exercise.draft is not defined");
  }

  const { lang, title, description } = latest;

  store.ExerciseSummary[id] = {
    ...base(entity),
    authorId,
    authorName: author.name,
    exerciseId,
    lang,
    title,
    tags: tags.map(tag => tag.name).join(" "),
    description,
    upvoteCount,
    downvoteCount,
    commentCount,
    submitCount,
    isDraft,
    isEditing: !draft.isMerged,
    isPrivate,
    isLocked
  };
};

const normalizeExerciseVote: Normalizer<ExerciseVoteEntity> = (_, store, entity) => {
  const { id, target, voter, isUp } = entity;
  if (target === undefined) {
    throw createError(500, "exerciseVote.target is not defined");
  }
  if (voter === undefined) {
    throw createError(500, "exerciseVote.voter is not defined");
  }

  store.ExerciseVote[id] = {
    ...base(entity),
    targetSummaryId: target.summaryId,
    voterSummaryId: voter.summaryId,
    isUp
  };
};

const normalizeGroup: Normalizer<GroupEntity> = (_, store, entity) => {
  const { id, summaryId, secretId, name, description } = entity;

  store.Group[id] = {
    ...base(entity),
    summaryId,
    secretId,
    name,
    description
  };
};

const normalizeGroupApplication: Normalizer<GroupApplicationEntity> = (context, store, entity) => {
  const { id, group, groupId, applicant, applicantId } = entity;
  if (group === undefined || applicant === undefined) {
    return;
  }

  store.GroupApplication[id] = {
    ...base(entity),
    groupId,
    groupSummaryId: group.summaryId,
    applicantId,
    applicantSummaryId: applicant.summaryId
  };

  if (group.summary !== undefined && applicant.summary !== undefined) {
    group.summary.group = group;
    applicant.summary.user = applicant;

    normalizeEntity(context, store, group.summary);
    normalizeEntity(context, store, applicant.summary);
  }
};

const normalizeGroupExercise: Normalizer<GroupExerciseEntity> = (_, store, entity) => {
  const { id, groupId, exercise, exerciseId } = entity;
  if (exercise === undefined) {
    return;
  }

  store.GroupExercise[id] = {
    ...base(entity),
    groupId,
    exerciseId,
    exerciseSummaryId: exercise.summaryId
  };
};

const normalizeGroupInvitation: Normalizer<GroupInvitationEntity> = (context, store, entity) => {
  const { id, group, groupId, target } = entity;
  if (group === undefined || target === undefined) {
    return;
  }

  store.GroupInvitation[id] = {
    ...base(entity),
    groupId,
    groupSummaryId: group.summaryId,
    targetSummaryId: target.summaryId
  };

  if (group.summary !== undefined) {
    group.summary.group = group;

    normalizeEntity(context, store, group.summary);
    normalizeEntity(context, store, target.summary);
  }
};

const normalizeGroupMember: Normalizer<GroupMemberEntity> = (context, store, entity) => {
  const { id, group, user, userId, permission } = entity;
  if (group === undefined || user === undefined) {
    return;
  }

  store.GroupMember[id] = {
    ...base(entity),
    groupSummaryId: group.summaryId,
    userId,
    userSummaryId: user.summaryId,
    permission
  };

  if (group.summary !== undefined) {
    group.summary.group = group;

    normalizeEntity(context, store, group.summary);
    normalizeEntity(context, store, user.summary);
  }
};

const normalizeGroupSecret: Normalizer<GroupSecretEntity> = (_, store, entity) => {
  const { id, group, groupId, value, expireAt } = entity;
  if (group === undefined) {
    throw createError(500, "groupSecret.group is not defined");
  }
  store.GroupSecret[id] = {
    ...base(entity),
    groupId,
    groupSummaryId: group.summaryId,
    value,
    expireAt: expireAt.getTime()
  };
};

const normalizeGroupSummary: Normalizer<GroupSummaryEntity> = (_, store, entity) => {
  const { id, group, groupId } = entity;
  if (group === undefined) {
    return;
  }

  const { name, description } = group;

  store.GroupSummary[id] = {
    ...base(entity),
    groupId,
    name,
    description
  };
};

const normalizeObjection: Normalizer<ObjectionEntity> = (context, store, entity) => {
  const { id, summary, summaryId, objectorId, targetType, targetId, description, state } = entity;
  if (summary === undefined) {
    throw createError(500, "objection.summary is not defined");
  }

  store.Objection[id] = {
    ...base(entity),
    summaryId,
    objectorId,
    targetType,
    targetId,
    description,
    state
  };

  summary.parent = entity;

  normalizeEntity(context, store, summary);
};

const normalizeObjectionComment: Normalizer<ObjectionCommentEntity> = (context, store, entity) => {
  const { id, author, authorId, body } = entity;
  if (author === undefined) {
    throw createError(500, "objectionComment.author is not defined");
  }
  if (author.summary === undefined) {
    throw createError(500, "objectionComment.author.summary is not defined");
  }

  store.ObjectionComment[id] = {
    ...base(entity),
    authorId,
    body
  };

  normalizeEntity(context, store, author.summary);
};

const normalizeObjectionSummary: Normalizer<ObjectionSummaryEntity> = (_, store, entity) => {
  const { id, parent, parentId, commentCount } = entity;
  if (parent === undefined) {
    throw createError(500, "objectionSummary.parent is not defined");
  }

  const { state } = parent;

  store.ObjectionSummary[id] = {
    ...base(entity),
    parentId,
    state,
    commentCount
  };
};

const normalizePlaylist: Normalizer<PlaylistEntity> = (context, store, entity) => {
  const { id, summary, summaryId, authorId, title, tags, description, orderBy, isPrivate, isLocked } = entity;
  if (summary === undefined) {
    throw createError(500, "playlist.summary is not defined");
  }

  store.Playlist[id] = {
    ...base(entity),
    authorId,
    summaryId,
    title,
    tags,
    description,
    orderBy,
    isPrivate,
    isLocked
  };

  summary.playlist = entity;

  normalizeEntity(context, store, summary);
};

const normalizePlaylistBookmark: Normalizer<PlaylistBookmarkEntity> = (context, store, entity) => {
  const { id, playlistId, playlist, isPrivate } = entity;

  store.PlaylistBookmark[id] = {
    ...base(entity),
    playlistId,
    isPrivate
  };

  if (playlist !== undefined && playlist.summary !== undefined) {
    playlist.summary.playlist = playlist;

    normalizeEntity(context, store, playlist.summary);
  }
};

const normalizePlaylistDiaryEntry: Normalizer<PlaylistDiaryEntryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.PlaylistDiaryEntry[id] = {
    ...base(entity),
    date,
    submittedCount,
    typedCount
  };
};

const normalizePlaylistItem: Normalizer<PlaylistItemEntity> = (context, store, entity) => {
  const { id, playlistId, exercise, nextId, memo } = entity;
  if (exercise === undefined) {
    return;
  }

  store.PlaylistItem[id] = {
    ...base(entity),
    exerciseId: exercise != null ? exercise.id : undefined,
    exerciseSummaryId: exercise != null ? exercise.summaryId : undefined,
    playlistId,
    nextId,
    memo
  };

  if (exercise != null && exercise.summary !== undefined) {
    exercise.summary.exercise = exercise;

    normalizeEntity(context, store, exercise.summary);
  }
};

const normalizePlaylistSummary: Normalizer<PlaylistSummaryEntity> = (_, store, entity) => {
  const { id, playlist, playlistId, tags = [], itemCount, submittedCount, typedCount } = entity;
  if (playlist === undefined) {
    return;
  }

  const { author, authorId, title, description, isPrivate } = playlist;
  if (author === undefined) {
    return;
  }

  store.PlaylistSummary[id] = {
    ...base(entity),
    authorId,
    authorName: author.name,
    playlistId,
    title,
    tags: tags.map(tag => tag.name).join(" "),
    description,
    itemCount,
    submittedCount,
    typedCount,
    isPrivate
  };
};

const normalizeReport: Normalizer<ReportEntity> = (context, store, entity) => {
  const { id, summary, summaryId, reporterId, targetType, targetId, reason, description, state } = entity;
  if (summary === undefined) {
    throw createError(500, "report.summary is not defined");
  }

  store.Report[id] = {
    ...base(entity),
    summaryId,
    reporterId,
    targetType,
    targetId,
    reason,
    description,
    state
  };

  summary.parent = entity;

  normalizeEntity(context, store, summary);
};

const normalizeReportComment: Normalizer<ReportCommentEntity> = (context, store, entity) => {
  const { id, author, authorId, body } = entity;
  if (author === undefined) {
    throw createError(500, "reportComment.author is not defined");
  }
  if (author.summary === undefined) {
    throw createError(500, "reportComment.author.summary is not defined");
  }

  store.ReportComment[id] = {
    ...base(entity),
    authorId,
    body
  };

  normalizeEntity(context, store, author.summary);
};

const normalizeReportSummary: Normalizer<ReportSummaryEntity> = (_, store, entity) => {
  const { id, parent, parentId, commentCount } = entity;
  if (parent === undefined) {
    throw createError(500, "reportSummary.parent is not defined");
  }

  const { reason, state } = parent;

  store.ReportSummary[id] = {
    ...base(entity),
    parentId,
    reason,
    state,
    commentCount
  };
};

const normalizeRevision: Normalizer<RevisionEntity> = (_, store, entity) => {
  const {
    id,
    summaryId,
    exerciseId,
    messageSubject,
    messageBody,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isRandom
  } = entity;

  store.Revision[id] = {
    ...base(entity),
    summaryId,
    exerciseId,
    messageSubject,
    messageBody,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isRandom
  };
};

const normalizeRevisionSummary: Normalizer<RevisionSummaryEntity> = (_, store, entity) => {
  const { id, revision, revisionId } = entity;
  if (revision === undefined) {
    throw createError(500, "revisionSummary.revision is not defined");
  }

  store.RevisionSummary[id] = {
    ...base(entity),
    revisionId,
    messageSubject: revision.messageSubject
  };
};

const normalizeSubmission: Normalizer<SubmissionEntity> = (_, store, entity) => {
  const { id, submitterId, exerciseId, typeCount, time, accuracy } = entity;

  store.Submission[id] = {
    ...base(entity),
    submitterId,
    exerciseId,
    typeCount,
    time,
    accuracy
  };
};

const normalizeSubmissionSummary: Normalizer<SubmissionSummaryEntity> = (context, store, entity) => {
  const { id, submitterId, exerciseId, exercise, latest, submitCount, typeCount, isRepeating, remindAt } = entity;
  if (exercise === undefined) {
    throw createError(500, "submissionSummary.exercise is not defined");
  }
  if (latest === undefined) {
    throw createError(500, "submissionSummary.latest is not defined");
  }

  store.SubmissionSummary[id] = {
    ...base(entity),
    submitterId,
    exerciseId,
    exerciseSummaryId: exercise.summaryId,
    latest: {
      typeCount: latest.typeCount,
      time: latest.time,
      accuracy: latest.accuracy
    },
    submitCount,
    typeCount,
    isRepeating,
    remindAt: remindAt.getTime()
  };

  if (exercise.summary !== undefined) {
    exercise.summary.exercise = exercise;

    normalizeEntity(context, store, exercise.summary);
  }
};

const normalizeSuggestion: Normalizer<SuggestionEntity> = (context, store, entity) => {
  const {
    id,
    summary,
    summaryId,
    authorId,
    revision,
    revisionId,
    state,
    messageSubject,
    messageBody,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isRandom
  } = entity;
  if (summary === undefined) {
    throw createError(500, "suggestion.summary is not defined");
  }
  if (revision === undefined) {
    throw createError(500, "suggestion.revision is not defined");
  }

  store.Suggestion[id] = {
    ...base(entity),
    summaryId,
    authorId,
    exerciseId: revision.exerciseId,
    revisionId,
    messageSubject,
    messageBody,
    state,
    lang,
    title,
    tags,
    description,
    questions,
    references,
    isRandom
  };

  summary.suggestion = entity;

  normalizeEntity(context, store, summary);
};

const normalizeSuggestionComment: Normalizer<SuggestionCommentEntity> = (context, store, entity) => {
  const { id, summary, summaryId, authorId, body } = entity;

  store.SuggestionComment[id] = {
    ...base(entity),
    summaryId,
    authorId,
    body
  };

  normalizeEntity(context, store, summary);
};

const normalizeSuggestionCommentSummary: Normalizer<SuggestionCommentSummaryEntity> = (_, store, entity) => {
  const { id, parentId, upvoteCount, downvoteCount } = entity;

  store.SuggestionCommentSummary[id] = {
    ...base(entity),
    parentId,
    upvoteCount,
    downvoteCount
  };
};

const normalizeSuggestionCommentVote: Normalizer<SuggestionCommentVoteEntity> = (_, store, entity) => {
  const { id, target, voter, isUp } = entity;
  if (target === undefined) {
    throw createError(500, "exerciseCommentVote.target is not defined");
  }
  if (voter === undefined) {
    throw createError(500, "exerciseCommentVote.voter is not defined");
  }

  store.SuggestionCommentVote[id] = {
    ...base(entity),
    targetSummaryId: target.summaryId,
    voterSummaryId: voter.summaryId,
    isUp
  };
};

const normalizeSuggestionSummary: Normalizer<SuggestionSummaryEntity> = (_, store, entity) => {
  const { id, suggestion, suggestionId, commentCount } = entity;
  if (suggestion === undefined) {
    throw createError(500, "suggestionSummary.suggestion is not defined");
  }

  const { messageSubject, state } = suggestion;

  store.SuggestionSummary[id] = {
    ...base(entity),
    suggestionId,
    messageSubject,
    state,
    commentCount
  };
};

const normalizeSynonym: Normalizer<SynonymEntity> = (_, store, entity) => {
  const { id, name, target } = entity;

  store.Synonym[id] = {
    ...base(entity),
    name,
    target
  };
};

const normalizeTag: Normalizer<TagEntity> = (_, store, entity) => {
  const { id, summaryId, name, description } = entity;

  store.Tag[id] = {
    ...base(entity),
    summaryId,
    name,
    description
  };
};

const normalizeTagDiaryEntry: Normalizer<TagDiaryEntryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.TagDiaryEntry[id] = {
    ...base(entity),
    date,
    submittedCount,
    typedCount
  };
};

const normalizeTagFollow: Normalizer<TagFollowEntity> = (context, store, entity) => {
  const { id, follower, target, checkedAt } = entity;
  if (follower === undefined || target === undefined) {
    return;
  }

  store.TagFollow[id] = {
    ...base(entity),
    followerSummaryId: follower.summaryId,
    targetSummaryId: target.summaryId,
    checkedAt: checkedAt.getTime()
  };

  normalizeEntity(context, store, follower.summary);
  normalizeEntity(context, store, target.summary);
};

const normalizeTagSummary: Normalizer<TagSummaryEntity> = (_, store, entity) => {
  const { id, tag, tagId, exerciseCount, playlistCount } = entity;
  if (tag === undefined) {
    return;
  }

  store.TagSummary[id] = {
    ...base(entity),
    tagId,
    name: tag.name,
    description: tag.description.slice(0, 100),
    exerciseCount,
    playlistCount
  };
};

const normalizeUser: Normalizer<UserEntity> = (context, store, entity) => {
  const { id, account, config, summary, summaryId, name, permission } = entity;
  if (summary === undefined) {
    throw createError(500, "user.summary is not defined");
  }

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    summaryId
  };

  summary.user = entity;

  normalizeEntity(context, store, account);
  normalizeEntity(context, store, config);
  normalizeEntity(context, store, summary);
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (context, store, entity) => {
  const { id, user, provider, accountId, email, avatar } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    provider,
    accountId,
    email,
    avatar
  };

  normalizeEntity(context, store, user);
};

const normalizeUserConfig: Normalizer<UserConfigEntity> = (_, store, entity) => {
  const { id, settings } = entity;

  store.UserConfig[id] = {
    ...base(entity),
    settings
  };
};

const normalizeUserDiaryEntry: Normalizer<UserDiaryEntryEntity> = (_, store, entity) => {
  const { id, date, submitCount, typeCount, submittedCount, typedCount, createCount, editCount } = entity;

  store.UserDiaryEntry[id] = {
    ...base(entity),
    date,
    submitCount,
    typeCount,
    submittedCount,
    typedCount,
    createCount,
    editCount
  };
};

const normalizeUserFollow: Normalizer<UserFollowEntity> = (context, store, entity) => {
  const { id, follower, target, checkedAt } = entity;
  if (follower === undefined || target === undefined) {
    return;
  }

  store.UserFollow[id] = {
    ...base(entity),
    followerSummaryId: follower.summaryId,
    targetSummaryId: target.summaryId,
    checkedAt: checkedAt.getTime()
  };

  if (follower.summary !== undefined && target.summary !== undefined) {
    follower.summary.user = follower;
    target.summary.user = target;

    normalizeEntity(context, store, follower.summary);
    normalizeEntity(context, store, target.summary);
  }
};

const normalizeUserMessage: Normalizer<UserMessageEntity> = (_, store, entity) => {
  const { id, body } = entity;

  store.UserMessage[id] = {
    ...base(entity),
    body
  };
};

const normalizeUserSession: Normalizer<UserSessionEntity> = (context, store, entity) => {
  const { id, user, userId, accessCount, deviceType, deviceName, os, browser } = entity;

  store.UserSession[id] = {
    ...base(entity),
    userId,
    accessCount,
    deviceType,
    deviceName,
    os,
    browser,
    isCurrent: entity.sessionId === context.sessionId
  };

  normalizeEntity(context, store, user);
};

const normalizeUserSummary: Normalizer<UserSummaryEntity> = (_, store, entity) => {
  const { id, user, userId, submitCount, typeCount, emailHash } = entity;
  if (user === undefined) {
    throw createError(500, "userSummary.user is not defined");
  }

  store.UserSummary[id] = {
    ...base(entity),
    userId,
    name: user.name,
    submitCount,
    typeCount,
    emailHash
  };
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  AppDiaryEntry: normalizeAppDiaryEntry,
  AppSummary: normalizeAppSummary,
  Contest: normalizeContest,
  ContestEntry: normalizeContestEntry,
  Exercise: normalizeExercise,
  ExerciseComment: normalizeExerciseComment,
  ExerciseCommentSummary: normalizeExerciseCommentSummary,
  ExerciseCommentVote: normalizeExerciseCommentVote,
  ExerciseDiaryEntry: normalizeExerciseDiaryEntry,
  ExerciseDraft: normalizeExerciseDraft,
  ExerciseSummary: normalizeExerciseSummary,
  ExerciseVote: normalizeExerciseVote,
  Group: normalizeGroup,
  GroupApplication: normalizeGroupApplication,
  GroupExercise: normalizeGroupExercise,
  GroupInvitation: normalizeGroupInvitation,
  GroupMember: normalizeGroupMember,
  GroupSecret: normalizeGroupSecret,
  GroupSummary: normalizeGroupSummary,
  Objection: normalizeObjection,
  ObjectionComment: normalizeObjectionComment,
  ObjectionSummary: normalizeObjectionSummary,
  Playlist: normalizePlaylist,
  PlaylistBookmark: normalizePlaylistBookmark,
  PlaylistDiaryEntry: normalizePlaylistDiaryEntry,
  PlaylistItem: normalizePlaylistItem,
  PlaylistSummary: normalizePlaylistSummary,
  Report: normalizeReport,
  ReportComment: normalizeReportComment,
  ReportSummary: normalizeReportSummary,
  Revision: normalizeRevision,
  RevisionSummary: normalizeRevisionSummary,
  Submission: normalizeSubmission,
  SubmissionSummary: normalizeSubmissionSummary,
  Suggestion: normalizeSuggestion,
  SuggestionComment: normalizeSuggestionComment,
  SuggestionCommentSummary: normalizeSuggestionCommentSummary,
  SuggestionCommentVote: normalizeSuggestionCommentVote,
  SuggestionSummary: normalizeSuggestionSummary,
  Synonym: normalizeSynonym,
  Tag: normalizeTag,
  TagDiaryEntry: normalizeTagDiaryEntry,
  TagFollow: normalizeTagFollow,
  TagSummary: normalizeTagSummary,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserDiaryEntry: normalizeUserDiaryEntry,
  UserFollow: normalizeUserFollow,
  UserMessage: normalizeUserMessage,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
