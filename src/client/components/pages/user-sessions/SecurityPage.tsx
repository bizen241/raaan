import { Devices, Warning } from "@material-ui/icons";
import React, { useContext } from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteAccountDialog } from "../../dialogs/user/DeleteAccountDialog";
import { LogoutDialog } from "../../dialogs/user/LogoutDialog";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const SecurityPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const [isLogoutDialogOpen, onToggleLogoutDialog] = useToggleState();
  const [isDeleteAccountDialogOpen, onToggleDeleteAccountDialog] = useToggleState();

  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="セキュリティ">
      <Button icon={<Devices />} label="セッション一覧" to="/user/security/sessions" />
      <Button icon={<Warning color="error" />} label="ログアウト" labelColor="error" onClick={onToggleLogoutDialog} />
      {!isOwner && (
        <Button
          icon={<Warning color="error" />}
          label="アカウントを削除"
          labelColor="error"
          onClick={onToggleDeleteAccountDialog}
        />
      )}
      <LogoutDialog isOpen={isLogoutDialogOpen} onClose={onToggleLogoutDialog} />
      <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={onToggleDeleteAccountDialog} />
    </Page>
  );
});
