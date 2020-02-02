import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { DeleteExerciseCommentBufferDialog } from "../../dialogs/exercise-comments/DeleteExerciseCommentBufferDialog";
import { Column, IconButton } from "../../ui";

export const ExerciseCommentBufferList = createBufferList("ExerciseComment")(
  React.memo(({ bufferType, bufferId, params }) => {
    const dispatch = useDispatch();

    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    if (params.targetId === undefined) {
      dispatch(actions.buffers.delete(bufferType, bufferId));

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
          <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
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
