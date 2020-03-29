import React from "react";
import { useDispatch } from "react-redux";
import { createEntityTypeToObject, EntityId, EntityType, ExerciseContent } from "../../../../shared/api/entities";
import { EntityStore } from "../../../../shared/api/response/get";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";

export const Entities: React.FunctionComponent = ({ children }) => {
  cacheEntities();

  return <>{children}</>;
};

export const getCacheId = <T extends EntityType>(i: number) =>
  `00000000-0000-0000-0000-${i.toString().padStart(12, "0")}` as EntityId<T>;

const id = getCacheId;
const base = <T extends EntityType>(id: EntityId<T>) => ({
  id,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  fetchedAt: Date.now()
});

export const cacheEntities = () => {
  cacheAppDiaryEntries();
  cacheExercises();
};

const cacheAppDiaryEntries = () => {
  const dispatch = useDispatch();

  dispatch(
    actions.cache.search(
      "AppDiaryEntry",
      {},
      {
        ids: [],
        count: 0,
        entities: {}
      }
    )
  );
};

const cacheExercises = () => {
  const dispatch = useDispatch();

  const store: EntityStore = createEntityTypeToObject();

  [...Array(10).keys()].map(i => cacheExercise(store, i));

  dispatch(actions.cache.get(store));

  dispatch(
    actions.cache.search(
      "ExerciseSummary",
      {
        searchSort: "createdAt",
        searchOrder: "DESC"
      },
      {
        ids: [],
        count: 0,
        entities: {}
      }
    )
  );
};

const cacheExercise = (store: EntityStore, i: number) => {
  const { currentUser } = useCurrentUser();

  const exerciseContent: ExerciseContent = {
    lang: "en",
    title: "title",
    tags: ["tag"],
    description: "description",
    questions: [],
    references: [],
    isRandom: true
  };

  store.Exercise[id(i)] = {
    ...base(id(i)),
    ...exerciseContent,
    summaryId: id(i),
    authorId: currentUser.id,
    latestId: id(i),
    draftId: id(i),
    isDraft: false,
    isLocked: false,
    isPrivate: false
  };

  store.ExerciseSummary[id(i)] = {
    ...base(id(i)),
    authorId: currentUser.id,
    authorName: currentUser.name,
    exerciseId: id(i),
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

  store.ExerciseDraft[id(i)] = {
    ...base(id(i)),
    ...exerciseContent,
    exerciseId: id(i),
    isMerged: false
  };

  store.Revision[id(i)] = {
    ...base(id(i)),
    ...exerciseContent,
    summaryId: id(i),
    exerciseId: id(i),
    messageSubject: "subject",
    messageBody: "body"
  };

  store.RevisionSummary[id(i)] = {
    ...base(id(i)),
    revisionId: id(i),
    messageSubject: "subject"
  };
};
