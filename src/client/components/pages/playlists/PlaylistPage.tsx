import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { PlaylistViewer } from "../../viewers/PlaylistViewer";

export const PlaylistPage = React.memo<PageProps>(props => {
  const playlistId = props.match.params.id as EntityId<"Playlist">;

  return (
    <Page title="プレイリストの詳細">
      <PlaylistViewer playlistId={playlistId} />
    </Page>
  );
});
