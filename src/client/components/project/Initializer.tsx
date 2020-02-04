import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggleState } from "../../hooks/useToggleState";
import { actions, RootState } from "../../reducers";
import { LoadingApp } from "./LoadingApp";

export const Initializer = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const dispatch = useDispatch();

  const [isInitialized, onInitialize] = useToggleState();

  const isReady = useSelector(({ app }: RootState) => app.isReady);
  const user = useSelector(({ app, cache }: RootState) => cache.get.User[app.userId]);
  const userConfig = useSelector(({ app, cache }: RootState) => cache.get.UserConfig[app.userConfigId]);

  useEffect(() => {
    dispatch(actions.app.initialize());
    onInitialize();
  }, []);
  useEffect(() => {
    const shouldReinitialize = isInitialized && (user === undefined || userConfig === undefined);
    if (shouldReinitialize) {
      dispatch(actions.app.initialize());
    }
  }, [user, userConfig]);

  const isLoaded = isReady && user && userConfig;
  if (!isLoaded) {
    return <LoadingApp />;
  }

  return <>{children}</>;
});
