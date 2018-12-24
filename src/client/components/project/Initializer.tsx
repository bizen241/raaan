import * as React from "react";
import { useEffect } from "react";
import { connector } from "../../reducers";
import { appActions } from "../../reducers/app";

export const Initializer = connector(
  state => ({
    isReady: state.app.isReady
  }),
  () => ({
    initialize: appActions.initialize
  }),
  ({ isReady, initialize, children }) => {
    useEffect(() => {
      initialize();
    }, []);

    return isReady ? <>{children}</> : <div>Loading...</div>;
  }
);
