import { Typography } from "@material-ui/core";
import { Sync, SystemUpdate } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { RootState } from "../../../reducers";
import { Button, Card } from "../../ui";

export const VersionPage = createPage()(
  React.memo(({ t }) => t("バージョン")),
  React.memo(() => {
    const hasUpdate = useSelector((state: RootState) => state.app.hasUpdate);

    return (
      <>
        <Card icon={<SystemUpdate />} title="バージョン">
          <Typography>{hasUpdate ? "更新があります。" : "最新のバージョンです。"}</Typography>
        </Card>
        {hasUpdate && <Button icon={<Sync />} label="更新する" onClick={() => location.reload()} />}
      </>
    );
  })
);
