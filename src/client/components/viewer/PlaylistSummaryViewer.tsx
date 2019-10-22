import { Box, Card, CardHeader, Chip, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, HowToVote, Lock, Public } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistSummary } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistDialog } from "../dialogs/playlists/DeletePlaylistDialog";
import { PublishPlaylistDialog } from "../dialogs/playlists/PublishPlaylistDialog";
import { UnpublishPlaylistDialog } from "../dialogs/playlists/UnpublishPlaylistDialog";
import { UserContext } from "../project/Context";
import { Menu, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const PlaylistSummaryViewer = withEntity<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: playlistSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { playlistId } = playlistSummary;

    const [isPublishPlaylistDialogOpen, onTogglePublishPlaylistDialog] = useToggleState();
    const [isUnpublishPlaylistDialogOpen, onToggleUnpublishPlaylistDialog] = useToggleState();
    const [isDeletePlaylistDialogOpen, onToggleDeletePlaylistDialog] = useToggleState();

    const isAuthor = playlistSummary.authorId !== currentUser.id;

    return (
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" gutterBottom>
              {playlistSummary.title || "無題"}
            </Typography>
          }
          subheader={
            <Row>
              {playlistSummary.tags.split(/\s/).map(
                tag =>
                  tag && (
                    <Box key={tag} pr={1} pb={1}>
                      <Chip label={tag} clickable component={RouterLink} to={`/tags/${tag}`} />
                    </Box>
                  )
              )}
            </Row>
          }
          action={
            isAuthor ? (
              <Menu>
                {isAuthor && (
                  <MenuItem component={RouterLink} to={`/playlists/${playlistId}/edit`}>
                    <Edit className={classes.leftIcon} />
                    編集する
                  </MenuItem>
                )}
                {playlistSummary.isPrivate ? (
                  <MenuItem onClick={onTogglePublishPlaylistDialog}>
                    <Public className={classes.leftIcon} />
                    公開する
                  </MenuItem>
                ) : null}
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
            ) : (
              <Menu>
                <MenuItem>
                  <HowToVote className={classes.leftIcon} />
                  投票する
                </MenuItem>
              </Menu>
            )
          }
        />
        <PublishPlaylistDialog
          playlistId={playlistId}
          isOpen={isPublishPlaylistDialogOpen}
          onClose={onTogglePublishPlaylistDialog}
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
