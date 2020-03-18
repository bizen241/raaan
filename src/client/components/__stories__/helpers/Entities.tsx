import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";

export const Entities = () => {
  const dispatch = useDispatch();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
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
  }, []);

  return null;
};
