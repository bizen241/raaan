import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadUserAccountDialog = createDialog<{
  userAccountId: EntityId<"UserAccount">;
}>()(
  React.memo(({ t }) => t("アバターの設定をアップロード")),
  React.memo(({ userAccountId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(actions.api.upload("UserAccount", userAccountId, undefined, onClose));
    };

    return (
      <>
        <Card>
          <Typography>アバターの設定をアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
