import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { TogglePlaylistItemList } from "../../lists/exercise-summaries/TogglePlaylistItemList";

export const PlaylistItemsDialog = createDialog<{
  playlistId: EntityId<"Playlist">;
}>()(
  React.memo(({ t }) => t("問題集をプレイリストに追加")),
  React.memo(({ playlistId }) => {
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      playlistId,
    });

    return <TogglePlaylistItemList initialParams={{}} playlistId={playlistId} onReload={onReloadPlaylistItems} />;
  })
);
