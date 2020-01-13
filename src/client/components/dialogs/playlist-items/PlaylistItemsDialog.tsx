import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { PlaylistContext, TogglePlaylistItemList } from "../../list/exercise-summaries/TogglePlaylistItemList";
import { DialogContent } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      playlistId
    });

    return (
      <DialogContent title="問題集をプレイリストに追加" onClose={onClose}>
        <PlaylistContext.Provider value={playlistId}>
          <TogglePlaylistItemList initialParams={{}} onReload={onReloadPlaylistItems} />
        </PlaylistContext.Provider>
      </DialogContent>
    );
  })
);
