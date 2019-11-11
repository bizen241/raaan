import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const RejectGroupInvitationDialog = createDialog<{
  groupInvitationId: string;
}>(
  React.memo(({ groupInvitationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupInvitation", groupInvitationId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="グループへの参加を辞退" onClose={onClose}>
        <Card icon={<RemoveCircle />} title="グループへの参加を辞退">
          <Typography>グループへの参加を辞退します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="参加を辞退" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
