import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteReportCommentBufferDialog = createDialog<{
  bufferId: string;
}>(
  React.memo(({ bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.buffers.delete("ReportComment", bufferId));

      onClose();
    };

    return (
      <DialogContent title="編集の破棄" onClose={onClose}>
        <Card>
          <Typography>編集内容がブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="編集を破棄" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
