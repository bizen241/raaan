import { Add, Bookmark, PlayArrow } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { usePlaylistBookmark } from "../../hooks/usePlaylistBookmark";
import { usePlaylistItems } from "../../hooks/usePlaylistItems";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistBookmarkDialog } from "../dialogs/playlist-bookmarks/DeletePlaylistBookmarkDialog";
import { UploadPlaylistBookmarkDialog } from "../dialogs/playlist-bookmarks/UploadPlaylistBookmarkDialog";
import { PlaylistItemsDialog } from "../dialogs/playlist-items/PlaylistItemsDialog";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { Button, Column } from "../ui";
import { PlaylistItemsViewer } from "./PlaylistItemsViewer";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = React.memo<{ playlistId: EntityId<"Playlist"> }>(({ playlistId }) => {
  const { currentUser } = useCurrentUser();

  const { entity: playlist } = useEntity("Playlist", playlistId);

  const [isPlaylistItemsDialogOpen, onTogglePlaylistItemsDialog] = useToggleState();
  const [isUploadPlaylistBookmarkDialogOpen, onToggleUploadPlaylistBookmarkDialog] = useToggleState();
  const [isDeletePlaylistBookmarkDialogOpen, onToggleDeletePlaylistBookmarkDialog] = useToggleState();
  const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();

  const { sortedPlaylistItems, playlistItemCount, onReloadPlaylistItems } = usePlaylistItems(playlistId, playlist);
  const { playlistBookmark } = usePlaylistBookmark(playlistId);

  const isAuthor = playlist.authorId === currentUser.id;

  return (
    <Column>
      <Button
        color="primary"
        icon={<PlayArrow />}
        label="始める"
        disabled={playlistItemCount === 0}
        onClick={onTogglePlaylistPlayer}
      />
      {isAuthor && <Button icon={<Add />} label="問題集を追加" onClick={onTogglePlaylistItemsDialog} />}
      {!isAuthor &&
        (!playlistBookmark ? (
          <Button icon={<Bookmark />} label="ブックマークに追加" onClick={onToggleUploadPlaylistBookmarkDialog} />
        ) : (
          <Button icon={<Bookmark />} label="ブックマークを解除" onClick={onToggleDeletePlaylistBookmarkDialog} />
        ))}
      <Column pb={1}>
        <PlaylistSummaryViewer playlistSummaryId={playlist.summaryId} />
      </Column>
      <Column pb={1}>
        <PlaylistItemsViewer
          playlist={playlist}
          sortedPlaylistItems={sortedPlaylistItems}
          onReload={onReloadPlaylistItems}
        />
      </Column>
      <PlaylistItemsDialog
        playlistId={playlistId}
        isOpen={isPlaylistItemsDialogOpen}
        onClose={onTogglePlaylistItemsDialog}
      />
      <UploadPlaylistBookmarkDialog
        playlistId={playlistId}
        isOpen={isUploadPlaylistBookmarkDialogOpen}
        onClose={onToggleUploadPlaylistBookmarkDialog}
      />
      {playlistBookmark && (
        <DeletePlaylistBookmarkDialog
          playlistBookmarkId={playlistBookmark.id}
          isOpen={isDeletePlaylistBookmarkDialogOpen}
          onClose={onToggleDeletePlaylistBookmarkDialog}
        />
      )}
      <PlaylistPlayer
        playlistItems={sortedPlaylistItems}
        startIndex={0}
        isOpen={isPlaylistPlayerOpen}
        onClose={onTogglePlaylistPlayer}
      />
    </Column>
  );
});
