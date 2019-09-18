import { Box, IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Exercise } from "../../../shared/api/entities";
import { createBufferList } from "../../enhancers/createBufferList";
import { useToggleState } from "../../hooks/toggle";
import { DeleteExerciseBufferDialog } from "../dialogs/DeleteExerciseBufferDialog";

export const ExerciseBufferList = createBufferList<Exercise>({ entityType: "Exercise" })(
  React.memo(({ bufferId, buffer, source = {} }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${bufferId}/edit`}>
              {buffer.title || source.title || "無題"}
            </Link>
          </Box>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteExerciseBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
