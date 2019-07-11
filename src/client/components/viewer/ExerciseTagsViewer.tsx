import { Box, Chip } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { ExerciseSummary } from "../../../shared/api/entities";

export const ExerciseTagsViewer = createEntityViewer<ExerciseSummary>(
  "ExerciseSummary",
  React.memo(({ entity: exerciseSummary }) => {
    return (
      <Box>
        {exerciseSummary.tags.map(tag => (
          <Box key={tag} pr={1}>
            <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
          </Box>
        ))}
      </Box>
    );
  })
);
