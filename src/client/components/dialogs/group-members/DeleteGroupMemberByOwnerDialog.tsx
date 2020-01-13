import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteGroupMemberByOwnerDialog = createDialog<{
  groupMemberId: string;
}>(
  React.memo(({ groupMemberId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupMember", groupMemberId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="メンバーの追放" onClose={onClose}>
        <Card icon={<RemoveCircle />} title="メンバーの追放">
          <Typography>メンバーを追放します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="メンバーを追放" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
