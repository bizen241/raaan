import { createEntityTypeToObject, EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { EntityStore } from "../../../shared/api/response/get";
import {
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
  GroupPlaylistEntity,
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
  const { id, target, comment, state } = entity;

  store.ExerciseObjection[id] = {
    ...base(entity),
    exerciseSummaryId: target && target.summaryId,
    comment,
    state
  };
};

const normalizeExerciseReport: Normalizer<ExerciseReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, reason, comment, state } = entity;

  store.ExerciseReport[id] = {
    ...base(entity),
    reporterId,
    exerciseSummaryId: target && target.summaryId,
    reason,
    comment,
    state
  };
};

const normalizeExerciseSummary: Normalizer<ExerciseSummaryEntity> = (context, store, entity) => {
  const { id, exercise, exerciseId, tags = [], upvoteCount, submittedCount: submitCount } = entity;
  if (exercise === undefined || exercise.draft === undefined) {
    return;
  }

  const { author, authorId, lang, title, description, isDraft, isPrivate } = exercise;

  store.ExerciseSummary[id] = {
    ...base(entity),
    authorId,
    exerciseId,
    lang,
    title,
    tags: tags.map(tag => tag.name).join(" "),
    description,
    upvoteCount,
    submitCount,
    isDraft,
    isEditing: !exercise.draft.isMerged,
    isPrivate
  };

  normalizeEntity(context, store, author);
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
  const { id, exercise } = entity;
  if (exercise === undefined) {
    return;
  }

  store.GroupExercise[id] = {
    ...base(entity),
    exerciseSummaryId: exercise.summaryId
  };
};

const normalizeGroupMember: Normalizer<GroupMemberEntity> = (_, store, entity) => {
  const { id, user, permission } = entity;
  if (user === undefined) {
    return;
  }

  store.GroupMember[id] = {
    ...base(entity),
    userSummaryId: user.summaryId,
    permission
  };
};

const normalizeGroupPlaylist: Normalizer<GroupPlaylistEntity> = (_, store, entity) => {
  const { id, playlist } = entity;
  if (playlist === undefined) {
    return;
  }

  store.GroupPlaylist[id] = {
    ...base(entity),
    playlistSummaryId: playlist.summaryId
  };
};

const normalizePlaylist: Normalizer<PlaylistEntity> = (_, store, entity) => {
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
};

const normalizePlaylistBookmark: Normalizer<PlaylistBookmarkEntity> = (_, store, entity) => {
  const { id, playlistId, memo } = entity;

  store.PlaylistBookmark[id] = {
    ...base(entity),
    playlistId,
    memo
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

const normalizePlaylistObjection: Normalizer<PlaylistObjectionEntity> = (_, store, entity) => {
  const { id, target, comment, state } = entity;

  store.PlaylistObjection[id] = {
    ...base(entity),
    playlistSummaryId: target && target.summaryId,
    comment,
    state
  };
};

const normalizePlaylistReport: Normalizer<PlaylistReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, reason, comment, state } = entity;

  store.PlaylistReport[id] = {
    ...base(entity),
    reporterId,
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

  const { authorId, title, description, isPrivate } = playlist;

  store.PlaylistSummary[id] = {
    ...base(entity),
    authorId,
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

const normalizeSynonym: Normalizer<SynonymEntity> = (_, store, entity) => {
  const { id, creatorId, name, target, state } = entity;

  store.Synonym[id] = {
    ...base(entity),
    creatorId,
    name,
    target,
    state
  };
};

const normalizeSynonymReport: Normalizer<SynonymReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, reason, comment, state } = entity;

  store.SynonymReport[id] = {
    ...base(entity),
    reporterId,
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

const normalizeTagFollow: Normalizer<TagFollowEntity> = (_, store, entity) => {
  const { id, target, followerId, checkedAt } = entity;
  if (target === undefined) {
    return;
  }

  store.TagFollow[id] = {
    ...base(entity),
    tagSummaryId: target.summaryId,
    followerId,
    checkedAt: checkedAt.getTime()
  };
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
  const { id, account, accountId, config, configId, summary, summaryId, name, permission } = entity;

  store.User[id] = {
    ...base(entity),
    name,
    permission,
    accountId,
    configId,
    summaryId
  };

  normalizeEntity(context, store, account);
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

const normalizeUserFollow: Normalizer<UserFollowEntity> = (_, store, entity) => {
  const { id, target, followerId, checkedAt } = entity;
  if (target === undefined) {
    return;
  }

  store.UserFollow[id] = {
    ...base(entity),
    userSummaryId: target.summaryId,
    followerId,
    checkedAt: checkedAt.getTime()
  };
};

const normalizeUserObjection: Normalizer<UserObjectionEntity> = (_, store, entity) => {
  const { id, target, comment, state } = entity;

  store.UserObjection[id] = {
    ...base(entity),
    userSummaryId: target && target.summaryId,
    comment,
    state
  };
};

const normalizeUserReport: Normalizer<UserReportEntity> = (_, store, entity) => {
  const { id, reporterId, target, reason, comment, state } = entity;

  store.UserReport[id] = {
    ...base(entity),
    reporterId,
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
  const { id, userId, submitCount, typeCount } = entity;

  store.UserSummary[id] = {
    ...base(entity),
    userId,
    submitCount,
    typeCount
  };
};

const normalizers: { [T in EntityType]: Normalizer<any> } = {
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
  GroupPlaylist: normalizeGroupPlaylist,
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
  UserObjection: normalizeUserObjection,
  UserReport: normalizeUserReport,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
