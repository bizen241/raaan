import { Group, Storage, SystemUpdate, Timeline } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../ui";

export const AppPage = React.memo(() => {
  return (
    <Page title="アプリ">
      <Button icon={<Group />} label="コミュニテイ" to="/app/community" />
      <Button icon={<Timeline />} label="記録" to="/app/diary" />
      <Button icon={<SystemUpdate />} label="バージョン" to="/app/version" />
      <Button icon={<Storage />} label="キャッシュ" to="/app/cache" />
    </Page>
  );
});
