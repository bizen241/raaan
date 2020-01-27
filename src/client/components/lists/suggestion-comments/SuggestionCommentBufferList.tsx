import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { mergeBuffer } from "../../../reducers/buffers";
import { DeleteSuggestionCommentBufferDialog } from "../../dialogs/suggestion-comments/DeleteSuggestionCommentBufferDialog";
import { Column } from "../../ui";

export const SuggestionCommentBufferList = createBufferList("SuggestionComment")(
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
            <Link color="textPrimary" component={RouterLink} to={`/suggestion/${params.targetId}/comments`}>
              <Typography>{params.body || ""}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteSuggestionCommentBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
