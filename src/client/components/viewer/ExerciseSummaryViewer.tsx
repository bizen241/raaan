import { Box, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { EntityViewer, EntityViewerContainerProps, EntityViewerRendererProps } from ".";
import { ExerciseSummary } from "../../../shared/api/entities";

export const ExerciseSummaryViewer = React.memo<EntityViewerContainerProps>(props => {
  return <EntityViewer {...props} entityType="ExerciseSummary" renderer={ExerciseSummaryViewerRenderer} />;
});

const ExerciseSummaryViewerRenderer = React.memo<EntityViewerRendererProps<ExerciseSummary>>(
  ({ entity: exerciseSummary }) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography>みんなの提出回数</Typography>
          <Typography variant="h4">{exerciseSummary.submitCount}</Typography>
          <Divider />
        </Box>
      </Box>
    );
  }
);
