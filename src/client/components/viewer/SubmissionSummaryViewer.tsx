import { Typography } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import * as React from "react";
import { useMemo } from "react";
import { SubmissionSummary } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { useSearch } from "../../hooks/useSearch";
import { Card, Column, Property } from "../ui";

export const SubmissionSummaryViewer = React.memo<{
  submitterId: string;
  exerciseId: string;
}>(({ submitterId, exerciseId }) => {
  const initialParams: Params<SubmissionSummary> = useMemo(
    () => ({
      submitterId,
      exerciseId,
      limit: 1,
      offset: 0
    }),
    []
  );

  const { entities } = useSearch<SubmissionSummary>("SubmissionSummary", initialParams);
  const submissionSummary = entities[0];

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
