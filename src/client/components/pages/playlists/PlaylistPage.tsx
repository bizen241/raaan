import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { PlaylistViewer } from "../../viewer/PlaylistViewer";

export const PlaylistPage = React.memo<PageProps>(props => {
  const playlistId = props.match.params.id;

  return (
    <Page title="プレイリストの詳細">
      <PlaylistViewer entityId={playlistId} />
    </Page>
  );
});
