import { Group, SystemUpdate } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../ui";

export const AppPage = React.memo(() => {
  return (
    <Page title="アプリ">
      <Button icon={<Group />} label="コミュニテイ" to="/app/community" />
      <Button icon={<SystemUpdate />} label="バージョン" to="/app/version" />
    </Page>
  );
});
