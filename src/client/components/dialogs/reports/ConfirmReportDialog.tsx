import { Edit, ReportProblem } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ReportTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useBuffers } from "../../../hooks/useBuffers";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button } from "../../ui";

export const ConfirmReportDialog = createDialog<{
  targetType: ReportTargetType;
  targetId: string;
}>()(
  React.memo(({ t }) => t("違反を報告する")),
  React.memo(({ targetType, targetId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const { entities: reportSummaries } = useSearch("ReportSummary", {
      reporterId: currentUser.id,
      targetType: "Exercise",
      targetId: targetId,
    });
    const reportSummary = reportSummaries[0];

    const { bufferIds: reportBufferIds, bufferMap: reportBufferMap } = useBuffers("Report");
    const reportBufferId = reportBufferIds.find((bufferId) => {
      const buffer = reportBufferMap[bufferId];

      return buffer && buffer.targetType === "Exercise" && buffer.targetId === targetId;
    });

    const reportId = (reportSummary && reportSummary.parentId) || reportBufferId;

    if (reportId !== undefined) {
      return <Button icon={<Edit />} label="編集する" to={`/reports/${reportId}/edit`} />;
    }

    const onCreate = useCallback(() => {
      const bufferId = generateLocalEntityId<"Report">();

      dispatch(
        actions.buffers.update("Report", bufferId, {
          targetType,
          targetId,
        })
      );
      dispatch(push(`/reports/${bufferId}/edit`));
    }, []);

    return <Button icon={<ReportProblem />} label="通報する" onClick={onCreate} />;
  })
);
