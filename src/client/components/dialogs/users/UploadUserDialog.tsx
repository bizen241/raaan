import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadUserDialog = createDialog<{
  userId: string;
}>()(
  React.memo(({ t }) => t("プロフィールをアップロード")),
  React.memo(({ userId: bufferId }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("User", bufferId, undefined, uploadResponse => {
          const userId = Object.keys(uploadResponse.User)[0];

          dispatch(replace(`/users/${userId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>プロフィールをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
