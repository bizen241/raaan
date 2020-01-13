import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteGroupApplicationDialog = createDialog<{
  groupApplicationId: string;
}>(
  React.memo(({ groupApplicationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupApplication", groupApplicationId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="申請の取り消し" onClose={onClose}>
        <Card>
          <Typography>グループへの参加の申請を取り消します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="申請を取り消し" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
