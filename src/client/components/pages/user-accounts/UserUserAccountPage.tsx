import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";
import { UserAccountViewer } from "../../viewer/UserAccountViewer";

export const UserUserAccountPage = () => {
  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);

  return (
    <Page title="プロバイダの設定">
      <Button label="メールアドレスの更新" />
      <Button label="プロバイダの変更" />
      <UserAccountViewer entityId={currentUserAccountId} />
    </Page>
  );
};
