import { EntityId } from "../../shared/api/entities";
import { useCurrentUser } from "./useCurrentUser";
import { useSearch } from "./useSearch";

export const usePlaylistBookmark = (playlistId: EntityId<"Playlist">) => {
  const { currentUser } = useCurrentUser();

  const { entities: playlistBookmarks } = useSearch("PlaylistBookmark", {
    userId: currentUser.id,
    playlistId
  });

  return {
    playlistBookmark: playlistBookmarks[0]
  };
};
