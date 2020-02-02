import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useContext } from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeletePlaylistBookmarkDialog } from "../../dialogs/playlist-bookmarks/DeletePlaylistBookmarkDialog";
import { UserContext } from "../../project/Context";
import { Column, IconButton } from "../../ui";

export const PlaylistBookmarkList = createEntityList("PlaylistBookmark", {
  itemHeight: 77
})(
  React.memo(({ entity: playlistBookmark }) => {
    const currentUser = useContext(UserContext);

    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Typography>{playlistBookmark.playlistId}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          {playlistBookmark.userId === currentUser.id ? (
            <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
          ) : null}
        </TableCell>
        <DeletePlaylistBookmarkDialog
          playlistBookmarkId={playlistBookmark.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
