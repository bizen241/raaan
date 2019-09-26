import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import * as React from "react";
import { useMemo } from "react";
import { SubmissionSummary } from "../../../shared/api/entities";
import { useSearch } from "../../hooks/search";
import { useStyles } from "../ui/styles";

export const SubmissionSummaryViewer = React.memo<{
  submitterId: string;
  exerciseId: string;
}>(({ submitterId, exerciseId }) => {
  const classes = useStyles();

  const initialParams: Partial<SubmissionSummary> = useMemo(
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
    <Card>
      <CardHeader
        title={<Typography>自分の記録</Typography>}
        avatar={
          <Avatar className={classes.cardAvatar}>
            <Person />
          </Avatar>
        }
      />
      <CardContent>
        {submissionSummary !== undefined ? (
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">提出回数</Typography>
              <Typography variant="h5" component="span">
                {submissionSummary.submitCount}
              </Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">最初の提出</Typography>
              <Typography variant="h5" component="span">
                {new Date(submissionSummary.createdAt).toLocaleString()}
              </Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">直近の提出</Typography>
              <Typography variant="h5" component="span">
                {new Date(submissionSummary.updatedAt).toLocaleString()}
              </Typography>
              <Divider />
            </Box>
          </Box>
        ) : (
          <Typography>まだ提出していません</Typography>
        )}
      </CardContent>
    </Card>
  );
});
