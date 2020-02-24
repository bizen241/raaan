import { EntityId } from "../../shared/api/entities";
import { useCurrentUser } from "./useCurrentUser";
import { useSearch } from "./useSearch";

export const usePlaylistBookmark = (playlistId: EntityId<"Playlist">) => {
  const { currentUserId } = useCurrentUser();

  const { entities: playlistBookmarks } = useSearch("PlaylistBookmark", {
    userId: currentUserId,
    playlistId
  });

  return {
    playlistBookmark: playlistBookmarks[0]
  };
};
