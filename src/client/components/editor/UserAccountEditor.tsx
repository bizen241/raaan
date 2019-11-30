import { Card, CardContent } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { AvatarType, UserAccount } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserAccountDialog } from "../dialogs/user-accounts/UploadUserAccountDialog";
import { UserContext } from "../project/Context";
import { Button, Column, Select } from "../ui";

const avatarTypeToLabel: { [T in AvatarType]: string } = {
  identicon: "identicon",
  gravatar: "gravatar"
};

export const UserAccountEditor = withBuffer<UserAccount>("UserAccount")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateAvatar = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ avatar: e.target.value as AvatarType });
    }, []);

    const canUpload = props.buffer !== undefined && currentUser.permission !== "Guest";

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <CardContent>
            <Select
              label="アバター"
              defaultValue={buffer.avatar || source.avatar || "identicon"}
              onChange={onUpdateAvatar}
            >
              {Object.entries(avatarTypeToLabel).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </CardContent>
        </Card>
        <UploadUserAccountDialog userAccountId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
