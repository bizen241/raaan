import { OrderBy, PlaylistItem } from "../../shared/api/entities";

export const sortPlaylistItems = (playlistItems: PlaylistItem[], orderBy: OrderBy) => {
  switch (orderBy) {
    case "manual_top":
    case "manual_bottom": {
      const sortedPlaylistItems: PlaylistItem[] = playlistItems;

      const last = playlistItems.find(item => item.nextId === undefined);
      if (last === undefined) {
        return playlistItems;
      }

      return sortedPlaylistItems;
    }
  }

  return playlistItems;
};
