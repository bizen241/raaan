import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteGroupBufferDialog = createDialog<{
  bufferId: string;
}>(
  React.memo(({ bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.buffers.delete("Group", bufferId));
      onClose();
    };

    return (
      <DialogContent title="編集の破棄" onClose={onClose}>
        <Card icon={<Warning />} title="編集の破棄">
          <Typography>編集内容がブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="編集を破棄" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
