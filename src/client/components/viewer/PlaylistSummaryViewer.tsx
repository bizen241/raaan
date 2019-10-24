import { Card, CardContent, CardHeader, Link, MenuItem, Typography } from "@material-ui/core";
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
import { Column, Menu, Property, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const PlaylistSummaryViewer = withEntity<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: playlistSummary }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const { playlistId } = playlistSummary;

    const [isPublishPlaylistDialogOpen, onTogglePublishPlaylistDialog] = useToggleState();
    const [isUnpublishPlaylistDialogOpen, onToggleUnpublishPlaylistDialog] = useToggleState();
    const [isDeletePlaylistDialogOpen, onToggleDeletePlaylistDialog] = useToggleState();

    const isAuthor = playlistSummary.authorId === currentUser.id;

    return (
      <Card>
        <CardHeader
          title={<Typography>{playlistSummary.title || "無題"}</Typography>}
          action={
            isAuthor ? (
              <Menu>
                <MenuItem component={RouterLink} to={`/playlists/${playlistId}/edit`}>
                  <Edit className={classes.leftIcon} />
                  編集する
                </MenuItem>
                {playlistSummary.isPrivate ? (
                  <MenuItem onClick={onTogglePublishPlaylistDialog}>
                    <Public className={classes.leftIcon} />
                    公開する
                  </MenuItem>
                ) : (
                  <MenuItem onClick={onToggleUnpublishPlaylistDialog}>
                    <Lock className={classes.leftIcon} />
                    非公開にする
                  </MenuItem>
                )}
                <MenuItem onClick={onToggleDeletePlaylistDialog}>
                  <Delete className={classes.leftIcon} />
                  削除
                </MenuItem>
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
        <CardContent>
          <Column>
            <Property label="タグ">
              <Row>
                {playlistSummary.tags.split(/\s/).map(
                  tag =>
                    tag && (
                      <Row key={tag} pr={1}>
                        <Link underline="always" color="textPrimary" component={RouterLink} to={`/tags/${tag}`}>
                          {tag}
                        </Link>
                      </Row>
                    )
                )}
              </Row>
            </Property>
            <Property label="作者">
              <Link
                underline="always"
                color="textPrimary"
                component={RouterLink}
                to={`/users/${playlistSummary.authorId}`}
              >
                {playlistSummary.authorName || "名無しさん"}
              </Link>
            </Property>
          </Column>
        </CardContent>
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
