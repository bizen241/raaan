import { OrderBy, PlaylistItem } from "../../shared/api/entities";

export const sortPlaylistItems = (playlistItems: PlaylistItem[], orderBy: OrderBy) => {
  switch (orderBy) {
    case "manual-last":
    case "manual-first": {
      const last = playlistItems.find((playlistItem) => playlistItem.nextId === undefined);
      if (last === undefined) {
        return playlistItems;
      }

      const sortedPlaylistItems = [last];

      let current = last;
      for (let i = 0; i < playlistItems.length - 1; i++) {
        const prev = playlistItems.find((playlistItem) => playlistItem.nextId === current.id);
        if (prev === undefined) {
          break;
        }

        current = prev;
        sortedPlaylistItems.unshift(prev);
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
