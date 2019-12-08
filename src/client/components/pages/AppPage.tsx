import { AccountCircle, Group, Security, SystemUpdate } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../ui";

export const AppPage = React.memo(() => {
  return (
    <Page title="管理">
      <Button icon={<Group />} label="コミュニテイ" to="/app/community" />
      <Button icon={<AccountCircle />} label="アカウント" to="/app/account" />
      <Button icon={<Security />} label="セキュリティ" to="/app/security" />
      <Button icon={<SystemUpdate />} label="バージョン" to="/app/version" />
    </Page>
  );
});
