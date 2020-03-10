import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { AvatarType, EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserAccountDialog } from "../dialogs/user-accounts/UploadUserAccountDialog";
import { Button, Card, Column, Select, SelectOptions } from "../ui";

const selectAvatarTypeOptions: SelectOptions<AvatarType> = {
  identicon: {
    label: "identicon"
  },
  gravatar: {
    label: "gravatar"
  }
};

export const UserAccountEditor = React.memo<{
  userAccountId: EntityId<"UserAccount">;
}>(({ userAccountId }) => {
  const { currentUser } = useCurrentUser();

  const { buffer, params, onChange } = useBuffer("UserAccount", userAccountId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateAvatar = useCallback((avatar: AvatarType) => {
    onChange({ avatar });
  }, []);

  const canUpload = buffer !== undefined && currentUser.permission !== "Guest";

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <Select<AvatarType>
          label="アバター"
          options={selectAvatarTypeOptions}
          defaultValue={params.avatar || "identicon"}
          onChange={onUpdateAvatar}
        />
      </Card>
      <UploadUserAccountDialog
        userAccountId={userAccountId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
