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

export const randomizePlaylistItems = (playlistItems: PlaylistItem[]) => {
  const result = [...playlistItems];

  for (let i = result.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [result[i], result[random]] = [result[random], result[i]];
  }

  return result;
};
