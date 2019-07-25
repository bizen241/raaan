import { Box, Link } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from ".";
import { Exercise } from "../../../../shared/api/entities";

export const ExerciseBufferList = createBufferList<Exercise>(
  "Exercise",
  React.memo(({ bufferId, buffer }) => {
    return (
      <Box display="flex" flexDirection="column">
        <Link color="textPrimary" component={RouterLink} to={`/exercises/${bufferId}/edit`}>
          {buffer.title || "無題"}
        </Link>
      </Box>
    );
  })
);
