import { Card, CardContent, Divider, Table, TableBody } from "@material-ui/core";
import { Add, Bookmark, PlayArrow, Refresh } from "@material-ui/icons";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { PlaylistItem } from "../../../shared/api/entities";
import { sortPlaylistItems } from "../../domain/playlist";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistBookmarkDialog } from "../dialogs/playlist-bookmarks/DeletePlaylistBookmarkDialog";
import { UploadPlaylistBookmarkDialog } from "../dialogs/playlist-bookmarks/UploadPlaylistBookmarkDialog";
import { PlaylistItemsDialog } from "../dialogs/playlist-items/PlaylistItemsDialog";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { UserContext } from "../project/Context";
import { Button, Column, IconButton, Row } from "../ui";
import { PlaylistItemViewer } from "./PlaylistItemViewer";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = withEntity("Playlist")(
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const currentUser = useContext(UserContext);

    const [isPlaylistItemsDialogOpen, onTogglePlaylistItemsDialog] = useToggleState();

    const [isUploadPlaylistBookmarkDialogOpen, onToggleUploadPlaylistBookmarkDialog] = useToggleState();
    const [isDeletePlaylistBookmarkDialogOpen, onToggleDeletePlaylistBookmarkDialog] = useToggleState();
    const { entities: bookmarks } = useSearch("PlaylistBookmark", {
      userId: currentUser.id,
      playlistId
    });
    const bookmark = bookmarks[0];
    const isBookmarked = bookmark !== undefined;

    const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();
    const [requestedPlaylistItems, requestPlaylistItems] = useState<PlaylistItem[]>([]);
    const { entities: playlistItems, count, onReload } = useSearch("PlaylistItem", {
      playlistId
    });
    const sortedPlaylistItems = useMemo(() => sortPlaylistItems(playlistItems, playlist.orderBy), [playlistItems]);
    const onPlay = useCallback(() => {
      requestPlaylistItems(sortedPlaylistItems);
      onTogglePlaylistPlayer();
    }, [sortedPlaylistItems]);
    const onPartialPlay = useCallback(
      (startIndex: number) => {
        requestPlaylistItems(sortedPlaylistItems.slice(startIndex));
        onTogglePlaylistPlayer();
      },
      [sortedPlaylistItems]
    );

    const isAuthor = playlist.authorId === currentUser.id;

    return (
      <Column>
        <Button color="primary" icon={<PlayArrow />} label="始める" disabled={count === 0} onClick={onPlay} />
        {isAuthor ? (
          <Button icon={<Add />} label="問題集を追加" onClick={onTogglePlaylistItemsDialog} />
        ) : !isBookmarked ? (
          <Button icon={<Bookmark />} label="ブックマークに追加" onClick={onToggleUploadPlaylistBookmarkDialog} />
        ) : (
          <Button icon={<Bookmark />} label="ブックマークを解除" onClick={onToggleDeletePlaylistBookmarkDialog} />
        )}
        <Column pb={1}>
          <PlaylistSummaryViewer entityId={playlist.summaryId} />
        </Column>
        <Card>
          <CardContent>
            <Column>
              <Row>
                <IconButton icon={Refresh} onClick={onReload} />
              </Row>
            </Column>
          </CardContent>
          <Divider />
          <Column pb={1}>
            <Table>
              <TableBody>
                {sortedPlaylistItems.map((playlistItem, index) => (
                  <PlaylistItemViewer
                    key={playlistItem.id}
                    index={index}
                    playlistItem={playlistItem}
                    playlistId={playlistId}
                    playlist={playlist}
                    playlistItems={playlistItems}
                    onPlay={onPartialPlay}
                  />
                ))}
              </TableBody>
            </Table>
          </Column>
        </Card>
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
        {bookmark && (
          <DeletePlaylistBookmarkDialog
            playlistBookmarkId={bookmark.id}
            isOpen={isDeletePlaylistBookmarkDialogOpen}
            onClose={onToggleDeletePlaylistBookmarkDialog}
          />
        )}
        <PlaylistPlayer
          playlistItems={requestedPlaylistItems}
          isOpen={isPlaylistPlayerOpen}
          onClose={onTogglePlaylistPlayer}
        />
      </Column>
    );
  })
);
