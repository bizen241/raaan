import { Box, IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from ".";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { UserContext } from "../../project/Context";

export const ExerciseSummaryList = createEntityList<ExerciseSummary>(
  "ExerciseSummary",
  React.memo(({ entity: exerciseSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
              {exerciseSummary.title || "無題"}
            </Link>
          </Box>
        </TableCell>
        {exerciseSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}/edit`}>
              <Edit />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );
  })
);