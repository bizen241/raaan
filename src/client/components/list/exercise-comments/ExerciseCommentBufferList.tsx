import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { mergeBuffer } from "../../../reducers/buffers";
import { DeleteExerciseCommentBufferDialog } from "../../dialogs/exercise-comments/DeleteExerciseCommentBufferDialog";
import { Column } from "../../ui";

export const ExerciseCommentBufferList = createBufferList("ExerciseComment")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const params = mergeBuffer(source, buffer);
    if (params.targetId === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${params.targetId}/comments`}>
              <Typography>{params.body || "空のコメント"}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteExerciseCommentBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
