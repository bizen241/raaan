import * as React from "react";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserUserAccountPage = () => {
  return (
    <Page title="プロバイダの設定">
      <Button label="メールアドレスの更新" />
      <Button label="プロバイダの変更" />
    </Page>
  );
};
