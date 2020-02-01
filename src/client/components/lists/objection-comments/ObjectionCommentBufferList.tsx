import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { DeleteObjectionCommentBufferDialog } from "../../dialogs/objection-comments/DeleteObjectionCommentBufferDialog";
import { Column } from "../../ui";

export const ObjectionCommentBufferList = createBufferList("ObjectionComment")(
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
            <Link color="textPrimary" component={RouterLink} to={`/objections/${params.targetId}`}>
              <Typography>{params.body || ""}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteObjectionCommentBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
