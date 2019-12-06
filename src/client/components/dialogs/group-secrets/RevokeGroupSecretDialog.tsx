import { Typography } from "@material-ui/core";
import { LinkOff } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const RevokeGroupSecretDialog = createDialog<{
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
            expireAt: Date.now() - 1000 * 60 * 60
          },
          onClose
        )
      );
    };

    return (
      <DialogContent title="招待用リンクを無効化" onClose={onClose}>
        <Card icon={<LinkOff />} title="招待用リンクを無効化">
          <Typography>招待用リンクを無効化します。</Typography>
        </Card>
        <Button icon={<LinkOff />} label="招待用リンクを無効化" onClick={onUpload} />
      </DialogContent>
    );
  })
);
