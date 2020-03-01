import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadGroupDialog = createDialog<{
  groupId: EntityId<"Group">;
}>()(
  React.memo(({ t }) => t("グループをアップロード")),
  React.memo(({ groupId: bufferId }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Group", bufferId, undefined, uploadResponse => {
          const groupId = Object.keys(uploadResponse.Group)[0];

          dispatch(replace(`/groups/${groupId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>グループをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
