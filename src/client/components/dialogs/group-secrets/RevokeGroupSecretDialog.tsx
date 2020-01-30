import { Typography } from "@material-ui/core";
import { LinkOff } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const RevokeGroupSecretDialog = createDialog<{
  groupSecretId: string;
}>()(
  React.memo(({ t }) => t("招待用リンクを無効化")),
  React.memo(({ groupSecretId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupSecret",
          groupSecretId,
          {
            expireAt: Date.now() - 1000 * 60 * 60
          },
          onClose
        )
      );
    };

    return (
      <>
        <Card>
          <Typography>招待用リンクを無効化します。</Typography>
        </Card>
        <Button icon={<LinkOff />} label="招待用リンクを無効化" onClick={onUpload} />
      </>
    );
  })
);
