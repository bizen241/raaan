import React from "react";
import { PlaylistDiaryGraph } from "../../graphs/PlaylistDiaryGraph";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const PlaylistDiaryPage = React.memo<PageProps>(props => {
  const playlistId = props.match.params.id;

  return (
    <Page title="プレイリストの記録">
      <PlaylistDiaryGraph entityId={playlistId} />
    </Page>
  );
});
