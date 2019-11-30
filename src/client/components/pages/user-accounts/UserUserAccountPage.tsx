import * as React from "react";
import { useSelector } from "react-redux";
import { useToggleState } from "../../../hooks/useToggleState";
import { RootState } from "../../../reducers";
import { UpdateEmailDialog } from "../../dialogs/user/UpdateEmailDialog";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";
import { UserAccountViewer } from "../../viewer/UserAccountViewer";

export const UserUserAccountPage = () => {
  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);

  const [isUpdateEmailDialogOpen, onToggleUpdateEmailDialog] = useToggleState();

  return (
    <Page title="プロバイダの設定">
      <Button label="メールアドレスの更新" onClick={onToggleUpdateEmailDialog} />
      <Button label="プロバイダの変更" to="/user/user-account/edit" />
      <UserAccountViewer entityId={currentUserAccountId} />
      <UpdateEmailDialog isOpen={isUpdateEmailDialogOpen} onClose={onToggleUpdateEmailDialog} />
    </Page>
  );
};