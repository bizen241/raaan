import { Box, IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseDraft } from "../../../shared/api/entities";
import { createBufferList } from "../../enhancers/createBufferList";
import { useToggleState } from "../../hooks/toggle";
import { DeleteExerciseDraftBufferDialog } from "../dialogs/DeleteExerciseDraftBufferDialog";

export const ExerciseDraftBufferList = createBufferList<ExerciseDraft>({ entityType: "ExerciseDraft" })(
  React.memo(({ bufferId, buffer, source = {} }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/exercise-drafts/${bufferId}/edit`}>
              {buffer.title || source.title || "無題"}
            </Link>
          </Box>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteExerciseDraftBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
