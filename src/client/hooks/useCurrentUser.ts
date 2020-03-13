import { useMemo } from "react";
import { useSelector } from "../reducers";

export const useCurrentUser = () => {
  const currentUserId = useSelector(state => state.app.userId);
  const currentUser = useSelector(state => state.cache.get.User[state.app.userId]);
  const currentUserBuffer = useSelector(state => state.buffers.User[state.app.userId]);
  if (currentUser === undefined) {
    throw new Error("user is not defined");
  }

  return {
    currentUserId,
    currentUser: useMemo(
      () => ({
        ...currentUser,
        ...currentUserBuffer
      }),
      [currentUser, currentUserBuffer]
    )
  };
};
