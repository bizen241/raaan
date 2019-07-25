import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../../reducers";

export const Initializer = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const dispatch = useDispatch();
  const isReady = useSelector((state: RootState) => state.app.isReady);

  useEffect(() => {
    dispatch(actions.app.initialize());
  }, []);

  if (!isReady) {
    return (
      <Card>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </Card>
    );
  }

  return <>{children}</>;
});
