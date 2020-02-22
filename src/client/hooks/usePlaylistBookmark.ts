import { EntityId } from "../../shared/api/entities";
import { useCurrentUser } from "./useCurrentUser";
import { useSearch } from "./useSearch";

export const usePlaylistBookmark = (playlistId: EntityId<"Playlist">) => {
  const { currentUserId } = useCurrentUser();

  const { entityIds: bookmarkIds } = useSearch("PlaylistBookmark", {
    userId: currentUserId,
    playlistId
  });
  const playlistBookmarkId = bookmarkIds[0] as EntityId<"PlaylistBookmark"> | undefined;

  return {
    playlistBookmarkId
  };
};
