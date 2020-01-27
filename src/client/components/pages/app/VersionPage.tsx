import { Typography } from "@material-ui/core";
import { Sync, SystemUpdate } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { Page } from "../../project/Page";
import { Button, Card } from "../../ui";

export const VersionPage = React.memo(() => {
  const hasUpdate = useSelector((state: RootState) => state.app.hasUpdate);

  return (
    <Page title="バージョン">
      <Card icon={<SystemUpdate />} title="バージョン">
        <Typography>{hasUpdate ? "更新があります。" : "最新のバージョンです。"}</Typography>
      </Card>
      {hasUpdate && <Button icon={<Sync />} label="更新する" onClick={() => location.reload()} />}
    </Page>
  );
});
