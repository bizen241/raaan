import { IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseDraft } from "../../../shared/api/entities";
import { createBufferList } from "../../enhancers/createBufferList";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteExerciseDraftBufferDialog } from "../dialogs/DeleteExerciseDraftBufferDialog";
import { Column } from "../ui";

export const ExerciseDraftBufferList = createBufferList<ExerciseDraft>({ entityType: "ExerciseDraft" })(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${bufferId}/edit`}>
              {buffer.title || (source && source.title) || "無題"}
            </Link>
          </Column>
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
