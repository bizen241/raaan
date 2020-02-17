import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export const useCurrentUser = () => {
  const currentUserId = useSelector(({ app }: RootState) => app.userId);
  const currentUser = useSelector(({ app, cache }: RootState) => cache.get.User[app.userId]);
  if (currentUser === undefined) {
    throw new Error("user is not defined");
  }

  return {
    currentUserId,
    currentUser
  };
};
