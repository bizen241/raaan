import React from "react";
import { PlaylistDiaryGraph } from "../../graphs/PlaylistDiaryGraph";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const PlaylistDiaryPage = React.memo<PageProps>(props => {
  const playlistId = props.match.params.id;

  return (
    <Page title="プレイリストの記録">
      <PlaylistDiaryGraph entityId={playlistId} />
    </Page>
  );
});
