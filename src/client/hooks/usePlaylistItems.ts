import { useMemo, useState } from "react";
import { EntityId, Playlist } from "../../shared/api/entities";
import { sortPlaylistItems } from "../domain/playlist";
import { useSearch } from "./useSearch";

export const usePlaylistItems = (playlistId: EntityId<"Playlist">, playlist: Playlist) => {
  const [orderBy, onChangeOrder] = useState(playlist.orderBy);

  const { entities: playlistItems, count, onReload } = useSearch("PlaylistItem", {
    playlistId
  });
  const sortedPlaylistItems = useMemo(() => sortPlaylistItems(playlistItems, orderBy), [playlistItems, orderBy]);

  return {
    sortedPlaylistItems,
    playlistItems,
    playlistItemCount: count,
    onChangeOrder,
    onReloadPlaylistItems: onReload
  };
};
