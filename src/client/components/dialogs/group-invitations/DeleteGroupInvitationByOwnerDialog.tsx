import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const CancelGroupInvitationDialog = createDialog<{
  groupInvitationId: string;
}>(
  React.memo(({ groupInvitationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupInvitation", groupInvitationId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="グループへの招待の取り消し" onClose={onClose}>
        <Card icon={<RemoveCircle />} title="グループへの招待の取り消し">
          <Typography>グループへの招待を取り消します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="招待を取り消し" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
