import { Box, IconButton, Link, TableCell, TableRow, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
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
  }),
  React.memo(({ searchParams, onChange }) => {
    return (
      <>
        <Box display="flex" flexDirection="column" pb={1}>
          <TextField
            label="タグ"
            variant="outlined"
            defaultValue={(searchParams.tags || []).join(" ")}
            onChange={useCallback(
              (e: React.ChangeEvent<HTMLInputElement>) => onChange({ tags: e.target.value.split(/\s/) }),
              []
            )}
          />
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <TextField
            label="題名"
            variant="outlined"
            defaultValue={searchParams.title}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }), [])}
          />
        </Box>
      </>
    );
  })
);
