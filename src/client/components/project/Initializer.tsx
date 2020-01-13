import { Typography } from "@material-ui/core";
import { HourglassEmpty } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggleState } from "../../hooks/useToggleState";
import { actions, RootState } from "../../reducers";
import { Card, Column } from "../ui";
import { Context } from "./Context";

export const Initializer = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const dispatch = useDispatch();

  const [isInitialized, onInitialize] = useToggleState();

  const isReady = useSelector(({ app }: RootState) => app.isReady);
  const user = useSelector(({ app, cache }: RootState) => cache.get.User[app.userId]);
  const userConfig = useSelector(({ app, cache }: RootState) => cache.get.UserConfig[app.userConfigId]);
  const userConfigBuffer = useSelector(({ app, buffers }: RootState) => buffers.UserConfig[app.userConfigId]);

  useEffect(() => {
    dispatch(actions.app.initialize());
    onInitialize();
  }, []);
  useEffect(() => {
    if (isInitialized && (user === undefined || userConfig === undefined)) {
      dispatch(actions.app.initialize());
    }
  }, [user, userConfig]);

  if (!isReady || user === undefined || userConfig === undefined) {
    return (
      <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
        <Column width="100%" maxWidth="1000px">
          <Column p={1}>
            <Card icon={<HourglassEmpty />} title="ロード中です">
              <Typography>しばらくお待ちください。</Typography>
            </Card>
          </Column>
        </Column>
      </Column>
    );
  }

  return (
    <Context user={user} userConfig={userConfig} userConfigBuffer={userConfigBuffer}>
      {children}
    </Context>
  );
});
