import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../../reducers";
import { Context } from "./Context";

export const Initializer = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const dispatch = useDispatch();
  const { userId, isReady, users, userBuffers, configs, configBuffers } = useSelector(
    ({ app, cache, buffers }: RootState) => ({
      ...app,
      users: cache.get.User,
      userBuffers: buffers.User,
      configs: cache.get.UserConfig,
      configBuffers: buffers.UserConfig
    })
  );

  useEffect(() => {
    dispatch(actions.app.initialize());
  }, []);

  const user = users[userId];
  const userBuffer = userBuffers[userId];
  const config = user && configs[user.configId];
  const configBuffer = user && configBuffers[user.configId];

  if (!isReady) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </Card>
    );
  }

  return (
    <Context
      user={user}
      userParams={userBuffer && userBuffer.edited}
      config={config}
      configParams={configBuffer && configBuffer.edited}
    >
      {children}
    </Context>
  );
});
