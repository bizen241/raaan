import { Box, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { EntityViewer, EntityViewerRendererProps } from ".";
import { SubmissionSummary } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { useSearch } from "../../hooks/search";

export const SubmissionSummaryViewer = React.memo<{
  userId: string;
  exerciseId: string;
}>(({ userId, exerciseId }) => {
  const searchParams: SearchParams<SubmissionSummary> = useMemo(
    () => ({
      userId,
      exerciseId,
      limit: 1,
      offset: 0
    }),
    []
  );

  const { searchResult } = useSearch("SubmissionSummary", searchParams);
  if (searchResult === undefined) {
    return null;
  }

  const entityId = searchResult.ids[0];
  if (entityId === undefined) {
    return null;
  }

  return <EntityViewer entityType="SubmissionSummary" entityId={entityId} renderer={SubmissionSummaryViewerRenderer} />;
});

const SubmissionSummaryViewerRenderer = React.memo<EntityViewerRendererProps<SubmissionSummary>>(
  ({ entity: submissionSummary }) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography>自分の提出回数</Typography>
          <Typography variant="h4">{submissionSummary.submitCount}</Typography>
          <Divider />
        </Box>
      </Box>
    );
  }
);
