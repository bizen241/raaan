import * as React from "react";
import { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { PlaylistContext, TogglePlaylistItemList } from "../../list/exercise-summaries/TogglePlaylistItemList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      playlistId
    });

    return (
      <DialogContent title="クイズをプレイリストに追加" onClose={onClose}>
        <PlaylistContext.Provider value={playlistId}>
          <TogglePlaylistItemList
            initialParams={{
              authorId: currentUser.id
            }}
            onReload={onReloadPlaylistItems}
          />
        </PlaylistContext.Provider>
      </DialogContent>
    );
  })
);
