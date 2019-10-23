import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { isLocalOnly } from "../../../reducers/api";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeleteExerciseReportDialog = createDialog<{
  reportId: string;
  targetId: string;
}>(
  React.memo(({ reportId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      if (isLocalOnly(reportId)) {
        dispatch(actions.buffers.delete("ExerciseReport", reportId));
        dispatch(replace(`/exercises/${targetId}`));
      } else {
        dispatch(actions.api.delete("ExerciseReport", reportId, () => dispatch(replace(`/exercises/${targetId}`))));
      }
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>通報の</Typography>
        </DialogHeader>
        <DialogMessage icon={<Warning />}>
          <Typography>通報を削除します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<Delete color="error" />} label="削除する" labelColor="error" onClick={onDelete} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
