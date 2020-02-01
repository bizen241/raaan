import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { RootState } from "../../../reducers";
import { ChangeProviderDialog } from "../../dialogs/user/ChangeProviderDialog";
import { Loading } from "../../project/Loading";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const EditUserAccountProviderPage = React.memo(() => {
  const [requestedProvider, setProvider] = useState();
  const [isChangeProviderDialogOpen, onToggleChangeProviderDialog] = useToggleState();

  const userAccountId = useSelector((state: RootState) => state.app.userAccountId);
  const { entity: userAccount, ...userAccountProps } = useEntity("UserAccount", userAccountId);
  if (userAccount === undefined) {
    return <Loading {...userAccountProps} />;
  }

  const { provider } = userAccount;

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
