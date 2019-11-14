import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteGroupApplicationByOwnerDialog = createDialog<{
  groupApplicationId: string;
}>(
  React.memo(({ groupApplicationId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupApplication", groupApplicationId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="申請の拒絶" onClose={onClose}>
        <Card icon={<RemoveCircle />} title="申請の拒絶">
          <Typography>申請を拒絶します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="申請を拒絶" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
