import { createEntityTypeToObject, EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { EntityStore } from "../../../shared/api/response/get";
import {
  ContestEntity,
  ContestEntryEntity,
  Entity,
  ExerciseDiaryEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseObjectionEntity,
  ExerciseReportEntity,
  ExerciseSummaryEntity,
  GroupEntity,
  GroupExerciseEntity,
  GroupMemberEntity,
  GroupSummaryEntity,
  PlaylistBookmarkEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistObjectionEntity,
  PlaylistReportEntity,
  PlaylistSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  SuggestionEntity,
  SuggestionSummaryEntity,
  SynonymEntity,
  SynonymReportEntity,
  TagEntity,
  TagFollowEntity,
  TagSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntity,
  UserEntity,
  UserFollowEntity,
  UserMessageEntity,
  UserObjectionEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";
import { BaseEntityClass } from "../../database/entities/BaseEntityClass";
import { ExerciseVoteEntity } from "../../database/entities/ExerciseVoteEntity";
import { UserReportEntity } from "../../database/entities/UserReportEntity";

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

const normalizeContestEntry: Normalizer<ContestEntryEntity> = (_, store, entity) => {
  const { id, contestId, participant, typeCount, time, accuracy } = entity;
  if (participant === undefined || participant.user === undefined) {
    return;
  }

  store.ContestEntry[id] = {
    ...base(entity),
    contestId,
    userSummaryId: participant.user.summaryId,
    typeCount,
    time,
    accuracy
  };
};

const normalizeExercise: Normalizer<ExerciseEntity> = (context, store, entity) => {
  const {
    id,
    author,
    authorId,
    summary,
    summaryId,
    draftId,
    lang,
    title,
    tags,
    description,
    questions,
    isRandom,
    isLocked,
    isPrivate
  } = entity;

  store.Exercise[id] = {
    ...base(entity),
    authorId,
    summaryId,
    draftId,
    lang,
    title,
    tags,
    description,
    questions,
    isRandom,
    isLocked,
    isPrivate
  };

  normalizeEntity(context, store, author);
  normalizeEntity(context, store, summary);
};

const normalizeExerciseDiary: Normalizer<ExerciseDiaryEntity> = (_, store, entity) => {
  const { id, date, submittedCount, typedCount } = entity;

  store.ExerciseDiary[id] = {
    ...base(entity),
    date,
    submittedCount,
    typedCount
  };
};

const normalizeExerciseDraft: Normalizer<ExerciseDraftEntity> = (_, store, entity) => {
  const { id, exerciseId, lang, title, tags, description, questions, isRandom, isMerged } = entity;

  store.ExerciseDraft[id] = {
    ...base(entity),
    exerciseId,
    lang,
    title,
    tags,
    description,
    questions,
    isRandom,
    isMerged
  };
};

const normalizeExerciseObjection: Normalizer<ExerciseObjectionEntity> = (_, store, entity) => {
  const { id, targetId, comment, state } = entity;

  store.ExerciseObjection[id] = {
    ...base(entity),
    targetId,
    comment,
    state
  };
};

const normalizeExerciseReport: Normalizer<ExerciseReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, targetId, reason, comment, state } = entity;

  store.ExerciseReport[id] = {
    ...base(entity),
    reporterId,
    targetId,
    exerciseSummaryId: target && target.summaryId,
    reason,
    comment,
    state
  };
};

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (_, store, entity) => {
  const { id, exercise, exerciseId, tags = [], upvoteCount, submittedCount: submitCount } = entity;
  if (exercise === undefined || exercise.draft === undefined) {
    return;
  }

  const { author, authorId, lang, title, description, isDraft, isPrivate, isLocked } = exercise;
  if (author === undefined) {
    return;
  }

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
    submitCount,
    isDraft,
    isEditing: !exercise.draft.isMerged,
    isPrivate,
    isLocked
  };
};

const normalizeExerciseVote: Normalizer<ExerciseVoteEntity> = (_, store, entity) => {
  const { id, targetId, voterId, isUp } = entity;

  store.ExerciseVote[id] = {
    ...base(entity),
    targetId,
    voterId,
    isUp
  };
};

const normalizeGroup: Normalizer<GroupEntity> = (_, store, entity) => {
  const { id, name, description } = entity;

  store.Group[id] = {
    ...base(entity),
    name,
    description
  };
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

const normalizePlaylist: Normalizer<PlaylistEntity> = (context, store, entity) => {
  const { id, authorId, summaryId, title, tags, description, orderBy, isPrivate, isLocked } = entity;

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

  if (entity.summary !== undefined) {
    entity.summary.playlist = entity;
    entity.summary.playlistId = entity.id;

    normalizeEntity(context, store, entity.summary);
  }
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

const normalizePlaylistObjection: Normalizer<PlaylistObjectionEntity> = (_, store, entity) => {
  const { id, targetId, comment, state } = entity;

  store.PlaylistObjection[id] = {
    ...base(entity),
    targetId,
    comment,
    state
  };
};

const normalizePlaylistReport: Normalizer<PlaylistReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, targetId, reason, comment, state } = entity;

  store.PlaylistReport[id] = {
    ...base(entity),
    reporterId,
    targetId,
    playlistSummaryId: target && target.summaryId,
    reason,
    comment,
    state
  };
};

const normalizePlaylistSummary: Normalizer<PlaylistSummaryEntity> = (_, store, entity) => {
  const { id, playlist, playlistId, tags = [], itemCount } = entity;
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
    isPrivate
  };
};

const normalizeRevision: Normalizer<RevisionEntity> = (_, store, entity) => {
  const { id, summaryId, lang, title, tags, description, questions, isRandom } = entity;

  store.Revision[id] = {
    ...base(entity),
    summaryId,
    lang,
    title,
    tags,
    description,
    questions,
    isRandom
  };
};

const normalizeRevisionSummary: Normalizer<RevisionSummaryEntity> = (_, store, entity) => {
  const { id, revisionId } = entity;

  store.RevisionSummary[id] = {
    ...base(entity),
    revisionId
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
  const { id, submitterId, exerciseId, exercise, latest, submitCount, typeCount } = entity;
  if (exercise === undefined || exercise.summary === undefined || latest === undefined) {
    return;
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
    typeCount
  };

  normalizeEntity(context, store, exercise.summary);
};

const normalizeSuggestion: Normalizer<SuggestionEntity> = (_, store, entity) => {
  const { id, summaryId, lang, title, tags, description, questions, isRandom } = entity;

  store.Suggestion[id] = {
    ...base(entity),
    summaryId,
    lang,
    title,
    tags,
    description,
    questions,
    isRandom
  };
};

const normalizeSuggestionSummary: Normalizer<SuggestionSummaryEntity> = (_, store, entity) => {
  const { id, suggestion, suggestionId } = entity;
  if (suggestion === undefined) {
    return;
  }

  const { authorId, revisionId } = suggestion;

  store.SuggestionSummary[id] = {
    ...base(entity),
    authorId,
    revisionId,
    suggestionId
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

const normalizeSynonymReport: Normalizer<SynonymReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, targetId, reason, comment, state } = entity;

  store.SynonymReport[id] = {
    ...base(entity),
    reporterId,
    targetId,
    synonymId: target && target.id,
    reason,
    comment,
    state
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
  const { id, config, configId, summary, summaryId, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    configId,
    summaryId
  };

  if (summary !== undefined) {
    summary.user = entity;
  }

  normalizeEntity(context, store, config);
  normalizeEntity(context, store, summary);
};

const normalizeUserAccount: Normalizer<UserAccountEntity> = (context, store, entity) => {
  const { id, user, provider, accountId, email } = entity;

  store.UserAccount[id] = {
    ...base(entity),
    provider,
    accountId,
    email
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

const normalizeUserDiary: Normalizer<UserDiaryEntity> = (_, store, entity) => {
  const { id, date, submitCount, typeCount, submittedCount, typedCount, createCount, editCount } = entity;

  store.UserDiary[id] = {
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

const normalizeUserObjection: Normalizer<UserObjectionEntity> = (_, store, entity) => {
  const { id, targetId, comment, state } = entity;

  store.UserObjection[id] = {
    ...base(entity),
    targetId,
    comment,
    state
  };
};

const normalizeUserReport: Normalizer<UserReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, targetId, reason, comment, state } = entity;

  store.UserReport[id] = {
    ...base(entity),
    reporterId,
    targetId,
    userSummaryId: target && target.summaryId,
    reason,
    comment,
    state
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
  const { id, user, userId, submitCount, typeCount } = entity;
  if (user === undefined) {
    return;
  }

  store.UserSummary[id] = {
    ...base(entity),
    userId,
    name: user.name,
    submitCount,
    typeCount
  };
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
  Contest: normalizeContest,
  ContestEntry: normalizeContestEntry,
  Exercise: normalizeExercise,
  ExerciseDiary: normalizeExerciseDiary,
  ExerciseDraft: normalizeExerciseDraft,
  ExerciseObjection: normalizeExerciseObjection,
  ExerciseReport: normalizeExerciseReport,
  ExerciseSummary: normalizeExerciseSummary,
  ExerciseVote: normalizeExerciseVote,
  Group: normalizeGroup,
  GroupExercise: normalizeGroupExercise,
  GroupMember: normalizeGroupMember,
  GroupSummary: normalizeGroupSummary,
  Playlist: normalizePlaylist,
  PlaylistBookmark: normalizePlaylistBookmark,
  PlaylistItem: normalizePlaylistItem,
  PlaylistObjection: normalizePlaylistObjection,
  PlaylistReport: normalizePlaylistReport,
  PlaylistSummary: normalizePlaylistSummary,
  Revision: normalizeRevision,
  RevisionSummary: normalizeRevisionSummary,
  Submission: normalizeSubmission,
  SubmissionSummary: normalizeSubmissionSummary,
  Suggestion: normalizeSuggestion,
  SuggestionSummary: normalizeSuggestionSummary,
  Synonym: normalizeSynonym,
  SynonymReport: normalizeSynonymReport,
  Tag: normalizeTag,
  TagFollow: normalizeTagFollow,
  TagSummary: normalizeTagSummary,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserDiary: normalizeUserDiary,
  UserFollow: normalizeUserFollow,
  UserMessage: normalizeUserMessage,
  UserObjection: normalizeUserObjection,
  UserReport: normalizeUserReport,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
