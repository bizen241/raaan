import { Email, Lock } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useToggleState } from "../../../hooks/useToggleState";
import { RootState } from "../../../reducers";
import { UpdateEmailDialog } from "../../dialogs/user/UpdateEmailDialog";
import { Page } from "../../project/Page";
import { Button } from "../../ui";
import { UserAccountViewer } from "../../viewers/UserAccountViewer";

export const UserAccountProviderPage = () => {
  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);

  const [isUpdateEmailDialogOpen, onToggleUpdateEmailDialog] = useToggleState();

  return (
    <Page title="プロバイダの設定">
      <Button icon={<Email />} label="メールアドレスの更新" onClick={onToggleUpdateEmailDialog} />
      <Button icon={<Lock />} label="プロバイダの変更" to="/user/account/provider/edit" />
      <UserAccountViewer entityId={currentUserAccountId} />
      <UpdateEmailDialog isOpen={isUpdateEmailDialogOpen} onClose={onToggleUpdateEmailDialog} />
    </Page>
  );
};
