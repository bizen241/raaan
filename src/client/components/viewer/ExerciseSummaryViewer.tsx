import { Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { createEntityViewer } from ".";
import { ExerciseSummary } from "../../../shared/api/entities";

export const ExerciseSummaryViewer = createEntityViewer<ExerciseSummary>(
  "ExerciseSummary",
  React.memo(({ entity: exerciseSummary }) => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography>みんなの提出回数</Typography>
              <Typography variant="h4">{exerciseSummary.submitCount}</Typography>
              <Divider />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  })
);
