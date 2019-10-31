import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { DeleteAccountDialog } from "../../dialogs/user/DeleteAccountDialog";
import { LogoutDialog } from "../../dialogs/user/LogoutDialog";
import { UserContext } from "../../project/Context";
import { Message } from "../../project/Message";
import { Button, Page } from "../../ui";

export const UserAccountsPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const [isLogoutDialogOpen, toggleLogoutDialog] = useState(false);
  const [isDeleteAccountDialogOpen, toggleDeleteAccountDialog] = useState(false);
  const onToggleLogoutDialog = useCallback(() => toggleLogoutDialog(s => !s), []);
  const onToggleDeleteAccountDialog = useCallback(() => toggleDeleteAccountDialog(s => !s), []);

  if (currentUser.permission !== "Guest") {
    return (
      <Page title="アカウント">
        <Button label="プロフィールを編集" to={`/users/${currentUser.id}/edit`} />
        <Button label="セッション一覧" to="/user/user-sessions" />
        <Button label={<Message id="logout" />} labelColor="error" onClick={onToggleLogoutDialog} />
        <Button label="アカウントを削除" labelColor="error" onClick={onToggleDeleteAccountDialog} />
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={onToggleLogoutDialog} />
        <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={onToggleDeleteAccountDialog} />
      </Page>
    );
  } else {
    return (
      <Page title="アカウント">
        <Button label="GitHubアカウントでログイン" href="/auth/github" />
      </Page>
    );
  }
});
