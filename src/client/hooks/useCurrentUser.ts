import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export const useCurrentUser = () => {
  const user = useSelector(({ app, cache }: RootState) => cache.get.User[app.userId]);
  if (user === undefined) {
    throw new Error("user is not defined");
  }

  return user;
};
