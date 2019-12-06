import { Card, CardContent } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { AvatarType } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserAccountDialog } from "../dialogs/user-accounts/UploadUserAccountDialog";
import { UserContext } from "../project/Context";
import { Button, Column, Select, SelectOptions } from "../ui";

const selectAvatarTypeOptions: SelectOptions<AvatarType> = {
  identicon: {
    label: "identicon"
  },
  gravatar: {
    label: "gravatar"
  }
};

export const UserAccountEditor = withBuffer("UserAccount")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateAvatar = useCallback((avatar: AvatarType) => {
      onChange({ avatar });
    }, []);

    const canUpload = props.buffer !== undefined && currentUser.permission !== "Guest";

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <CardContent>
            <Select<AvatarType>
              label="アバター"
              options={selectAvatarTypeOptions}
              defaultValue={buffer.avatar || source.avatar || "identicon"}
              onChange={onUpdateAvatar}
            />
          </CardContent>
        </Card>
        <UploadUserAccountDialog userAccountId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
