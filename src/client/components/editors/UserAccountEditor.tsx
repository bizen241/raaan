import { CloudUpload } from "@material-ui/icons";
import React, { useCallback, useContext } from "react";
import { AvatarType } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadUserAccountDialog } from "../dialogs/user-accounts/UploadUserAccountDialog";
import { UserContext } from "../project/Context";
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
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateAvatar = useCallback((avatar: AvatarType) => {
      onChange({ avatar });
    }, []);

    const params = mergeBuffer(source, buffer);

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
