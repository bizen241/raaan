import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserAccount } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { RootState } from "../../../reducers";
import { ChangeProviderDialog } from "../../dialogs/user/ChangeProviderDialog";
import { Button, Page } from "../../ui";

export const EditUserAccountPage = React.memo(() => {
  const [requestedProvider, setProvider] = useState();
  const [isChangeProviderDialogOpen, onToggleChangeProviderDialog] = useToggleState();

  const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
  const { entity: currentUserAccount } = useEntity<UserAccount>("UserAccount", currentUserAccountId);
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
      {provider !== "twitter" && (
        <Button
          label="Twitterアカウントに変更"
          onClick={() => {
            setProvider("twitter");
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
