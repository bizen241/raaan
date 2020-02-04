import { Link } from "@material-ui/core";
import { Delete, Edit, HowToVote, Lock, PlaylistPlay, Public, Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistDialog } from "../dialogs/playlists/DeletePlaylistDialog";
import { PublishPlaylistDialog } from "../dialogs/playlists/PublishPlaylistDialog";
import { UnpublishPlaylistDialog } from "../dialogs/playlists/UnpublishPlaylistDialog";
import { Card, Menu, MenuItem, Property, Row } from "../ui";

export const PlaylistSummaryViewer = withEntity("PlaylistSummary")(
  React.memo(({ entity: playlistSummary }) => {
    const currentUser = useCurrentUser();

    const { playlistId } = playlistSummary;

    const [isPublishPlaylistDialogOpen, onTogglePublishPlaylistDialog] = useToggleState();
    const [isUnpublishPlaylistDialogOpen, onToggleUnpublishPlaylistDialog] = useToggleState();
    const [isDeletePlaylistDialogOpen, onToggleDeletePlaylistDialog] = useToggleState();

    const { onReload } = useEntity("Playlist", playlistId, false);

    const isAuthor = playlistSummary.authorId === currentUser.id;

    return (
      <Card
        icon={<PlaylistPlay />}
        title={playlistSummary.title || "無題"}
        action={
          isAuthor ? (
            <Menu>
              <MenuItem icon={<Edit />} label="編集する" to={`/playlists/${playlistId}/edit`} />
              {playlistSummary.isPrivate ? (
                <MenuItem icon={<Public />} label="公開する" onClick={onTogglePublishPlaylistDialog} />
              ) : (
                <MenuItem icon={<Lock />} label="非公開にする" onClick={onToggleUnpublishPlaylistDialog} />
              )}
              <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeletePlaylistDialog} />
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
            </Menu>
          ) : (
            <Menu>
              <MenuItem icon={<HowToVote />} label="投票する" />
              <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
            </Menu>
          )
        }
      >
        <Property label="提出回数">
          <Link underline="always" color="textPrimary" component={RouterLink} to={`/playlists/${playlistId}/diary`}>
            {playlistSummary.submittedCount}
          </Link>
        </Property>
        {playlistSummary.tags && (
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
        )}
        <Property label="作者">
          <Link underline="always" color="textPrimary" component={RouterLink} to={`/users/${playlistSummary.authorId}`}>
            {playlistSummary.authorName || "名無しさん"}
          </Link>
        </Property>
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
