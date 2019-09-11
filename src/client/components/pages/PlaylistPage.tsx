import * as React from "react";
import { PageProps } from "../project/Router";
import { PlaylistViewer } from "../viewer/PlaylistViewer";
import { Page } from "./Page";

export const PlaylistPage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  return (
    <Page title="プレイリストの詳細">
      <PlaylistViewer entityId={exerciseId} />
    </Page>
  );
});
