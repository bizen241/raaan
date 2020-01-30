import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadUserConfigDialog = createDialog<{
  userConfigId: string;
}>()(
  React.memo(({ t }) => t("設定をアップロード")),
  React.memo(({ userConfigId }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("UserConfig", userConfigId, undefined, () => {
          dispatch(push("/user"));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>設定をアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
