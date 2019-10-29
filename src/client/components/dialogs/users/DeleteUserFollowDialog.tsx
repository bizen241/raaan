import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteUserFollowDialog = createDialog<{
  userFollowId: string;
}>(
  React.memo(({ userFollowId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("UserFollow", userFollowId, onClose));
    };

    return (
      <DialogContent title="ユーザーをフォロー解除" onClose={onClose}>
        <Card icon={<RemoveCircle />} title="ユーザーをフォロー解除">
          <Typography>フォローを解除します。</Typography>
        </Card>
        <Button icon={<RemoveCircle />} label="フォローを解除する" onClick={onDelete} />
      </DialogContent>
    );
  })
);