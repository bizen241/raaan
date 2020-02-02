import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeletePlaylistBufferDialog } from "../../dialogs/playlists/DeletePlaylistBufferDialog";
import { Column, IconButton } from "../../ui";

export const PlaylistBufferList = createBufferList("Playlist")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/playlists/${bufferId}/edit`}>
              <Typography>{buffer.title || (source && source.title) || "無題"}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
        </TableCell>
        <DeletePlaylistBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
