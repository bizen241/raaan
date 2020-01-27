import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { PlaylistViewer } from "../../viewers/PlaylistViewer";

export const PlaylistPage = React.memo<PageProps>(props => {
  const playlistId = props.match.params.id;

  return (
    <Page title="プレイリストの詳細">
      <PlaylistViewer entityId={playlistId} />
    </Page>
  );
});
