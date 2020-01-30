import { Cloud } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { AuthProviderName } from "../../../../shared/auth";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { RootState } from "../../../reducers";
import { Button, Card, Property } from "../../ui";

export const ChangeProviderDialog = createDialog<{
  requestedProvider: AuthProviderName;
}>()(
  React.memo(({ t }) => t("プロバイダの変更")),
  React.memo(({ requestedProvider }) => {
    const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
    const { entity: currentUserAccount } = useEntity("UserAccount", currentUserAccountId);
    if (currentUserAccount === undefined) {
      return null;
    }

    const { provider: currentProvider } = currentUserAccount;

    return (
      <>
        <Card>
          <Property label="変更前">{currentProvider}</Property>
          <Property label="変更後">{requestedProvider}</Property>
        </Card>
        <Button icon={<Cloud />} label="プロバイダを変更" href={`/auth/${requestedProvider}`} />
      </>
    );
  })
);
