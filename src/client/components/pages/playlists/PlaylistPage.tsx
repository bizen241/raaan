import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { PlaylistViewer } from "../../viewer/PlaylistViewer";

export const PlaylistPage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  return (
    <Page title="プレイリストの詳細">
      <PlaylistViewer entityId={exerciseId} />
    </Page>
  );
});
