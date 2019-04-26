import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { useEffect } from "react";
import { connector } from "../../reducers";
import { Column } from "../ui";
import { Context } from "./Context";

export const Initializer = connector(
  ({ app, cache, buffers }) => ({
    ...app,
    users: cache.get.User,
    userBuffers: buffers.User,
    configs: cache.get.UserConfig,
    configBuffers: buffers.UserConfig
  }),
  ({ app }) => ({
    initialize: app.initialize
  }),
  ({ userId, isReady, hasError, users, userBuffers, configs, configBuffers, initialize, children }) => {
    useEffect(() => {
      initialize();
    }, []);

    const user = users[userId];
    const userBuffer = userBuffers[userId];
    const config = user && configs[user.configId];
    const configBuffer = user && configBuffers[user.configId];

    if (!isReady || user === undefined || config === undefined) {
      return (
        <Column>
          <Callout>ロード中...</Callout>
        </Column>
      );
    }
    if (hasError) {
      throw new Error();
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
  }
);
