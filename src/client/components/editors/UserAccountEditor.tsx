import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { AvatarType } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
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

export const UserAccountEditor = withBuffer("UserAccount")(
  React.memo(({ bufferId, buffer, params, onChange }) => {
    const { currentUser } = useCurrentUser();
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
        <UploadUserAccountDialog userAccountId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
