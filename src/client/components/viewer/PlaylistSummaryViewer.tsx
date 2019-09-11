import { Box, Card, CardHeader, Chip, MenuItem, Typography } from "@material-ui/core";
import { Delete, Lock } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { PlaylistSummary } from "../../../shared/api/entities";
import { useToggleState } from "../dialogs";
import { DeletePlaylistDialog } from "../dialogs/DeletePlaylistDialog";
import { UnpublishPlaylistDialog } from "../dialogs/UnpublishPlaylistDialog";
import { UserContext } from "../project/Context";
import { Menu } from "../ui/Menu";
import { useStyles } from "../ui/styles";

export const PlaylistSummaryViewer = createEntityViewer<PlaylistSummary>(
  "PlaylistSummary",
  React.memo(({ entity: playlistSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { playlistId } = playlistSummary;

    const [isUnpublishPlaylistDialogOpen, onToggleUnpublishPlaylistDialog] = useToggleState();
    const [isDeletePlaylistDialogOpen, onToggleDeletePlaylistDialog] = useToggleState();

    const isAuthor = playlistSummary.authorId === currentUser.id;

    return (
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" gutterBottom>
              {playlistSummary.title || "無題"}
            </Typography>
          }
          subheader={
            <Box display="flex">
              {playlistSummary.tags.split(/\s/).map(
                tag =>
                  tag && (
                    <Box key={tag} pr={1} pb={1}>
                      <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                    </Box>
                  )
              )}
            </Box>
          }
          action={
            <Menu>
              {!playlistSummary.isPrivate ? (
                <MenuItem onClick={onToggleUnpublishPlaylistDialog}>
                  <Lock className={classes.leftIcon} />
                  非公開にする
                </MenuItem>
              ) : null}
              {isAuthor && (
                <MenuItem onClick={onToggleDeletePlaylistDialog}>
                  <Delete className={classes.leftIcon} />
                  削除
                </MenuItem>
              )}
            </Menu>
          }
        />
        <UnpublishPlaylistDialog
          playlistId={playlistId}
          isOpen={isUnpublishPlaylistDialogOpen}
          onClose={onToggleUnpublishPlaylistDialog}
        />
        <DeletePlaylistDialog
          playlistId={playlistId}
          isOpen={isDeletePlaylistDialogOpen}
          onClose={onToggleDeletePlaylistDialog}
        />
      </Card>
    );
  })
);
