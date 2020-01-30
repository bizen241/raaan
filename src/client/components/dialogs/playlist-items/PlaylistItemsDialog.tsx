import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { PlaylistContext, TogglePlaylistItemList } from "../../lists/exercise-summaries/TogglePlaylistItemList";

export const PlaylistItemsDialog = createDialog<{
  playlistId: string;
}>()(
  React.memo(({ t }) => t("問題集をプレイリストに追加")),
  React.memo(({ playlistId }) => {
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      playlistId
    });

    return (
      <>
        <PlaylistContext.Provider value={playlistId}>
          <TogglePlaylistItemList initialParams={{}} onReload={onReloadPlaylistItems} />
        </PlaylistContext.Provider>
      </>
    );
  })
);
