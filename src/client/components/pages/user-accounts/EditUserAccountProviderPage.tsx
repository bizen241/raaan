import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { RootState } from "../../../reducers";
import { ChangeProviderDialog } from "../../dialogs/user/ChangeProviderDialog";
import { Button, Page } from "../../ui";

export const EditAccountProviderPage = React.memo(() => {
  const [requestedProvider, setProvider] = useState();
  const [isChangeProviderDialogOpen, onToggleChangeProviderDialog] = useToggleState();

  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
  const { entity: currentUserAccount } = useEntity("UserAccount", currentUserAccountId);
  if (currentUserAccount === undefined) {
    return null;
  }

  const { provider } = currentUserAccount;

  return (
    <Page title="プロバイダの変更">
      {provider !== "github" && (
        <Button
          label="GitHubアカウントに変更"
          onClick={() => {
            setProvider("github");
            onToggleChangeProviderDialog();
          }}
        />
      )}
      {provider !== "google" && (
        <Button
          label="Googleアカウントに変更"
          onClick={() => {
            setProvider("google");
            onToggleChangeProviderDialog();
          }}
        />
      )}
      <ChangeProviderDialog
        requestedProvider={requestedProvider}
        isOpen={isChangeProviderDialogOpen}
        onClose={onToggleChangeProviderDialog}
      />
    </Page>
  );
});
