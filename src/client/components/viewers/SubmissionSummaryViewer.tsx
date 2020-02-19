import { Typography } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useSearch } from "../../hooks/useSearch";
import { Loading } from "../project/Loading";
import { Card, Column, Property } from "../ui";

export const SubmissionSummaryViewer = React.memo<{
  exerciseId: EntityId<"Exercise">;
  submitterId: EntityId<"User">;
}>(({ exerciseId, submitterId }) => {
  const { entityIds, entityMap, status, onReload } = useSearch("SubmissionSummary", {
    exerciseId,
    submitterId
  });
  if (status !== 200) {
    return <Loading getStatus={status} onReload={onReload} />;
  }
  const submissionSummaryId = entityIds[0];
  const submissionSummary = submissionSummaryId && entityMap[submissionSummaryId];

  return (
    <Card icon={<Assessment />} title="自分の記録">
      {submissionSummary !== undefined ? (
        <Column>
          <Property label="提出回数">{submissionSummary.submitCount}</Property>
          <Property label="最初の提出">{new Date(submissionSummary.createdAt).toLocaleDateString()}</Property>
          <Property label="直近の提出">{new Date(submissionSummary.updatedAt).toLocaleDateString()}</Property>
        </Column>
      ) : (
        <Typography>まだ提出していません</Typography>
      )}
    </Card>
  );
});
