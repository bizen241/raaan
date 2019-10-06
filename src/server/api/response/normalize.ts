import { createEntityTypeToObject, EntityType } from "../../../shared/api/entities";
import { BaseEntityObject } from "../../../shared/api/entities/BaseEntityObject";
import { EntityStore } from "../../../shared/api/response/get";
import {
  Entity,
  ExerciseDiaryEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseReportEntity,
  ExerciseSummaryEntity,
  PlaylistBookmarkEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistReportEntity,
  PlaylistSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  TagEntity,
  TagSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntity,
  UserEntity,
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

  const { author, authorId, draftId, lang, title, description, isDraft, isPrivate } = exercise;

  store.ExerciseSummary[id] = {
    ...base(entity),
    authorId,
    exerciseId,
    draftId,
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
  const { id, exercise, nextId, memo } = entity;
  if (exercise === undefined) {
    return;
  }

  store.PlaylistItem[id] = {
    ...base(entity),
    exerciseId: exercise != null ? exercise.id : undefined,
    exerciseSummaryId: exercise != null ? exercise.summaryId : undefined,
    nextId,
    memo
  };

  if (exercise != null && exercise.summary !== undefined) {
    exercise.summary.exercise = exercise;

    normalizeEntity(context, store, exercise.summary);
  }
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

const normalizeTag: Normalizer<TagEntity> = (_, store, entity) => {
  const { id, summaryId, name, description } = entity;

  store.Tag[id] = {
    ...base(entity),
    summaryId,
    name,
    description
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
  ExerciseReport: normalizeExerciseReport,
  ExerciseSummary: normalizeExerciseSummary,
  ExerciseVote: normalizeExerciseVote,
  Playlist: normalizePlaylist,
  PlaylistBookmark: normalizePlaylistBookmark,
  PlaylistItem: normalizePlaylistItem,
  PlaylistReport: normalizePlaylistReport,
  PlaylistSummary: normalizePlaylistSummary,
  Revision: normalizeRevision,
  RevisionSummary: normalizeRevisionSummary,
  Submission: normalizeSubmission,
  SubmissionSummary: normalizeSubmissionSummary,
  Tag: normalizeTag,
  TagSummary: normalizeTagSummary,
  User: normalizeUser,
  UserAccount: normalizeUserAccount,
  UserConfig: normalizeUserConfig,
  UserDiary: normalizeUserDiary,
  UserReport: normalizeUserReport,
  UserSession: normalizeUserSession,
  UserSummary: normalizeUserSummary
};
