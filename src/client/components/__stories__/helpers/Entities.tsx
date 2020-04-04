import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  createEntityTypeToObject,
  dateToDateString,
  EntityId,
  EntityType,
  EntityTypeToEntity,
  ExerciseContent
} from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { EntityStore } from "../../../../shared/api/response/get";
import { useEntities } from "../../../hooks/useEntities";
import { actions } from "../../../reducers";

export const Entities: React.FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();

  const { entityIds } = useEntities("AppDiaryEntry");

  useEffect(() => {
    const isCached = entityIds.length !== 0;
    if (isCached) {
      return;
    }

    cacheEntities(dispatch);
  }, []);

  return <>{children}</>;
};

export const getCacheId = <T extends EntityType>(i: number) =>
  `00000000-0000-0000-0000-${i.toString().padStart(12, "0")}` as EntityId<T>;

const indexes = (count: number) => [...Array(count).keys()];
const id = getCacheId;
const base = <T extends EntityType>(id: EntityId<T>) => ({
  id,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  fetchedAt: Date.now()
});

const createStore = () => createEntityTypeToObject<EntityStore>();
const cacheStore = (store: EntityStore) => {
  return actions.cache.get(store);
};
const casheSearchResult = <T extends EntityType>(
  entityType: T,
  count: number,
  params: Params<EntityTypeToEntity[T]>
) => {
  const ids = indexes(count).map(i => getCacheId(i));

  return actions.cache.search(entityType, params, {
    ids,
    count: ids.length,
    entities: {}
  });
};

export const cacheEntities = (dispatch: Dispatch) => {
  const store = createStore();

  cacheAppDiaryEntries(store, dispatch);
  cacheContests(store, dispatch);
  cacheExercises(store, dispatch);
  cacheGroups(store, dispatch);
  cacheUsers(store, dispatch);
  cacheUserDiaryEntries(store, dispatch);

  dispatch(cacheStore(store));
};

const cacheAppDiaryEntries = (store: EntityStore, dispatch: Dispatch) => {
  const count = 365;

  indexes(count).map(i => cacheAppDiaryEntry(store, i));

  dispatch(casheSearchResult("AppDiaryEntry", count, {}));
};

const cacheContests = (store: EntityStore, dispatch: Dispatch) => {
  const count = 10;

  indexes(count).map(i => cacheContest(store, i));

  dispatch(
    casheSearchResult("Contest", count, {
      groupId: id(0)
    })
  );
};

const cacheExercises = (store: EntityStore, dispatch: Dispatch) => {
  const count = 10;

  indexes(count).map(i => cacheExercise(store, i));

  dispatch(
    casheSearchResult("ExerciseSummary", count, {
      searchSort: "createdAt",
      searchOrder: "DESC"
    })
  );
};

const cacheGroups = (store: EntityStore, dispatch: Dispatch) => {
  const count = 10;

  indexes(count).map(i => cacheGroup(store, i));

  dispatch(casheSearchResult("GroupSummary", count, {}));
};

const cacheUsers = (store: EntityStore, dispatch: Dispatch) => {
  const count = 10;

  indexes(count).map(i => cacheUser(store, i));

  dispatch(casheSearchResult("UserSummary", count, {}));
};

const cacheUserDiaryEntries = (store: EntityStore, dispatch: Dispatch) => {
  const count = 365;

  indexes(count).map(i => cacheUserDiaryEntry(store, i));

  dispatch(
    casheSearchResult("UserDiaryEntry", count, {
      targetId: id(0)
    })
  );
};

const cacheAppDiaryEntry = (store: EntityStore, i: number) => {
  store.AppDiaryEntry[id(i)] = {
    ...base(id(i)),
    date: dateToDateString(new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
    typedCount: 1,
    submittedCount: 1
  };
};

const cacheContest = (store: EntityStore, i: number) => {
  store.Contest[id(i)] = {
    ...base(id(i)),
    groupId: id(0),
    exerciseId: id(i),
    title: `Contest No.${i}`,
    startAt: Date.now(),
    finishAt: Date.now()
  };
};

const cacheExercise = (store: EntityStore, index: number) => {
  const exerciseContent: ExerciseContent = {
    lang: "en",
    title: `Exercise No.${index}`,
    tags: ["tag"],
    description: "description",
    questions: [],
    references: [],
    isRandom: true
  };

  store.Exercise[id(index)] = {
    ...base(id(index)),
    ...exerciseContent,
    summaryId: id(index),
    authorId: id(0),
    latestId: id(index),
    draftId: id(index),
    isDraft: false,
    isLocked: false,
    isPrivate: false
  };

  store.ExerciseSummary[id(index)] = {
    ...base(id(index)),
    authorId: id(0),
    authorName: `User No.0`,
    exerciseId: id(index),
    lang: exerciseContent.lang,
    title: exerciseContent.title,
    tags: exerciseContent.tags.join(" "),
    description: exerciseContent.description,
    upvoteCount: 0,
    downvoteCount: 0,
    commentCount: 0,
    submitCount: 0,
    isDraft: false,
    isEditing: true,
    isPrivate: false,
    isLocked: true
  };

  store.ExerciseDraft[id(index)] = {
    ...base(id(index)),
    ...exerciseContent,
    exerciseId: id(index),
    isMerged: false
  };

  store.Revision[id(index)] = {
    ...base(id(index)),
    ...exerciseContent,
    summaryId: id(index),
    exerciseId: id(index),
    messageSubject: "subject",
    messageBody: "body"
  };

  store.RevisionSummary[id(index)] = {
    ...base(id(index)),
    revisionId: id(index),
    messageSubject: "subject"
  };
};

const cacheGroup = (store: EntityStore, index: number) => {
  store.Group[id(index)] = {
    ...base(id(index)),
    summaryId: id(index),
    secretId: id(index),
    name: `Group No.${index}`,
    description: "description"
  };

  store.GroupSummary[id(index)] = {
    ...base(id(index)),
    groupId: id(index),
    name: `Group No.${index}`,
    description: "description"
  };
};

const cacheUser = (store: EntityStore, index: number) => {
  store.User[id(index)] = {
    ...base(id(index)),
    summaryId: id(index),
    name: `User No.${index}`,
    permission: "Write"
  };

  store.UserSummary[id(index)] = {
    ...base(id(index)),
    userId: id(index),
    name: `User No.${index}`,
    submitCount: 0,
    typeCount: 0,
    emailHash: ""
  };
};

const cacheUserDiaryEntry = (store: EntityStore, i: number) => {
  store.UserDiaryEntry[id(i)] = {
    ...base(id(i)),
    targetId: id(0),
    date: dateToDateString(new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
    typedCount: 1,
    typeCount: 0,
    submittedCount: 1,
    submitCount: 0,
    createCount: 0,
    editCount: 0
  };
};
