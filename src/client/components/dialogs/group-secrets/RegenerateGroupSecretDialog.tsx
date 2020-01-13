import { Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const RegenerateGroupSecretDialog = createDialog<{
  groupSecretId: string;
}>(
  React.memo(({ groupSecretId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupSecret",
          groupSecretId,
          {
            expireAt: Date.now() + 1000 * 60 * 60
          },
          onClose
        )
      );
    };

    return (
      <DialogContent title="招待用リンクを再生成" onClose={onClose}>
        <Card icon={<Refresh />} title="招待用リンクを再生成">
          <Typography>招待用リンクを再生成します。</Typography>
        </Card>
        <Button icon={<Refresh />} label="招待用リンクを再生成" onClick={onUpload} />
      </DialogContent>
    );
  })
);
