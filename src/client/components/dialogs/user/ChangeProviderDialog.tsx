import { Cloud } from "@material-ui/icons";
import * as React from "react";
import { useSelector } from "react-redux";
import { UserAccount } from "../../../../shared/api/entities";
import { AuthProviderName } from "../../../../shared/auth";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { RootState } from "../../../reducers";
import { Button, Card, DialogContent, Property } from "../../ui";

export const ChangeProviderDialog = createDialog<{
  requestedProvider: AuthProviderName;
}>(
  React.memo(({ requestedProvider, onClose }) => {
    const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
    const { entity: currentUserAccount } = useEntity<UserAccount>("UserAccount", currentUserAccountId);
    if (currentUserAccount === undefined) {
      return null;
    }

    const { provider: currentProvider } = currentUserAccount;

    return (
      <DialogContent title="プロバイダの変更" onClose={onClose}>
        <Card icon={<Cloud />} title="プロバイダの変更">
          <Property label="変更前">{currentProvider}</Property>
          <Property label="変更後">{requestedProvider}</Property>
        </Card>
        <Button icon={<Cloud />} label="プロバイダを変更" href={`/auth/${requestedProvider}`} />
      </DialogContent>
    );
  })
);
