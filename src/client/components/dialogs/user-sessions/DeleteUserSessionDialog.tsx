import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteUserSessionDialog = createDialog<{
  userSessionId: string;
}>(
  React.memo(({ userSessionId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("UserSession", userSessionId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="セッションの削除" onClose={onClose}>
        <Card icon={<Warning />} title="セッションの削除">
          <Typography>セッションがサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="セッションを削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
