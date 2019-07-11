import { Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
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

  const { entities } = useSearch<SubmissionSummary>("SubmissionSummary", searchParams);
  const submissionSummary = entities[0];

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" mb={1}>
            <Typography>自分の提出回数</Typography>
            <Typography variant="h4">{submissionSummary !== undefined ? submissionSummary.submitCount : 0}</Typography>
            <Divider />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});
