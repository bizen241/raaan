import { Typography } from "@material-ui/core";
import { ReportProblem, Warning } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ReportTarget } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmReportDialog = createDialog<{
  targetType: ReportTarget;
  targetId: string;
}>(
  React.memo(({ targetType, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(
        actions.buffers.update("Report", bufferId, {
          targetType,
          targetId
        })
      );
      dispatch(push(`/reports/${bufferId}/edit`));
    }, []);

    return (
      <DialogContent title="違反を報告する" onClose={onClose}>
        <Card icon={<Warning />} title="違反を報告する">
          <Typography>本当に通報しますか？</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="通報する" onClick={onCreate} />
      </DialogContent>
    );
  })
);
