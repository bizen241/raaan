import { button } from "@storybook/addon-knobs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions, useSelector } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";

export const Entities = () => {
  const dispatch = useDispatch();
  const { currentUser } = useCurrentUser();

  button("reset", () => {
    dispatch(actions.buffers.delete(undefined, undefined));
    dispatch(actions.cache.purge(undefined, undefined));
  });

  const cache = useSelector(state => state.cache.search.AppDiaryEntry);
  const isFirst = Object.keys(cache).length === 0;

  useEffect(() => {
    if (!isFirst) {
      return;
    }

    const exerciseId = generateLocalEntityId<"Exercise">();
    const contestId = generateLocalEntityId<"Contest">();
    const groupId = generateLocalEntityId<"Group">();

    dispatch(
      actions.cache.get({
        Contest: {
          [contestId]: {
            id: contestId,
            exerciseId,
            title: "",
            startAt: Date.now(),
            finishAt: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            fetchedAt: Date.now()
          }
        }
      })
    );
    dispatch(
      actions.cache.get({
        Group: {
          [groupId]: {
            id: groupId,
            name: "",
            description: "",
            secretId: generateLocalEntityId<"GroupSecret">(),
            summaryId: generateLocalEntityId<"GroupSummary">(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            fetchedAt: Date.now()
          }
        }
      })
    );

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
    dispatch(
      actions.cache.search(
        "UserDiaryEntry",
        {
          targetId: currentUser.id
        },
        {
          ids: [],
          count: 0,
          entities: {}
        }
      )
    );
    dispatch(
      actions.cache.search(
        "Contest",
        {
          groupId
        },
        {
          ids: [contestId],
          count: 1,
          entities: {}
        }
      )
    );

    dispatch(
      actions.buffers.update("Contest", contestId, {
        title: "Test Contest"
      })
    );
  }, []);

  return null;
};
