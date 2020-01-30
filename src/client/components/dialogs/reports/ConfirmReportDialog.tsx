import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { ReportTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card } from "../../ui";

export const ConfirmReportDialog = createDialog<{
  targetType: ReportTargetType;
  targetId: string;
}>()(
  React.memo(({ t }) => t("違反を報告する")),
  React.memo(({ targetType, targetId }) => {
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
      <>
        <Card>
          <Typography>本当に通報しますか？</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="通報する" onClick={onCreate} />
      </>
    );
  })
);
