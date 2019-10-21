import { Typography } from "@material-ui/core";
import { ReportProblem, Warning } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ExerciseReport } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const ConfirmExerciseReportDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(
        actions.buffers.update<ExerciseReport>("ExerciseReport", bufferId, {
          targetId
        })
      );
      dispatch(push(`/exercise-reports/${bufferId}/edit`));
    }, []);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>違反を報告する</Typography>
        </DialogHeader>
        <DialogMessage icon={<Warning />}>
          <Typography>本当に通報しますか？</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<ReportProblem />} label="通報する" onClick={onCreate} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
